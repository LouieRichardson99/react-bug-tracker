const { connection } = require("../../config/dbConnection");

const registerOrganisation = async (name, user) => {
  try {
    const createdOrganisationId = await connection
      .promise()
      .execute(
        `INSERT INTO organisations (name) 
      VALUES (?)`,
        [name]
      )
      .then(([rows]) => rows.insertId);

    connection.promise().execute(
      `INSERT INTO organisation_users (user_id, organisation_id, is_admin) 
        VALUES (?, ?, ?)`,
      [user.id, createdOrganisationId, 1]
    );

    return {
      status: 201,
      message: "Organisation created successfully!",
    };
  } catch (err) {
    console.error(err);

    return {
      status: 500,
      message: "Oops.. Something seems to have gone wrong!",
    };
  }
};

const fetchOrganisationsData = async (userId) => {
  try {
    async function fetchProjectBugs() {
      return await connection
        .promise()
        .execute(
          `SELECT project_id, bugs.id AS bug_id, subject, description, status, due_date, assignee, priority 
      FROM organisation_users
      JOIN projects ON projects.organisation_id = organisation_users.organisation_id
      JOIN bugs ON bugs.project_id = projects.id
      AND user_id = ?`,
          [userId]
        )
        .then(([rows]) => {
          rows.forEach(async (row) => {
            const bug = {
              projectId: row.project_id,
              bugId: row.bug_id,
              subject: row.subject,
              description: row.description,
              status: row.status,
              priority: row.priority,
              dueDate: row.due_date,
              assignee: row.assignee,
            };

            const project = await projects.find(
              (project) => project?.projectId === row.project_id
            );

            project?.bugs.push(bug);
          });
        });
    }

    const projects = await connection
      .promise()
      .execute(
        `SELECT projects.id, projects.organisation_id, name FROM organisation_users
      JOIN projects ON projects.organisation_id = organisation_users.organisation_id
      AND user_id = ?`,
        [userId]
      )
      .then(([rows]) => {
        const projects = [];

        rows.forEach((row) => {
          const project = {
            projectId: row.id,
            organisationId: row.organisation_id,
            name: row.name,
            bugs: [],
          };
          projects.push(project);
        });

        fetchProjectBugs();

        return projects;
      });

    const organisations = await connection
      .promise()
      .execute(
        `SELECT name, organisation_id, is_admin 
      FROM organisation_users 
      JOIN organisations ON organisation_users.organisation_id = organisations.id 
      AND user_id = ? 
      ORDER BY organisations.id`,
        [userId]
      )
      .then(([rows]) => {
        const organisations = [];

        rows.forEach((row) => {
          organisations.push({ ...row, projects: [] });
        });

        projects.forEach((project) => {
          const organisation = organisations.find(
            (org) => org.organisation_id === project.organisationId
          );

          organisation.projects.push(project);
        });

        return organisations;
      });

    return {
      status: 200,
      message: "Organisations fetched successfully",
      data: organisations,
    };
  } catch (err) {
    console.error(err);

    return {
      status: 500,
      message: "There seems to be an issue retrieving your organisations",
    };
  }
};

module.exports = { registerOrganisation, fetchOrganisationsData };
