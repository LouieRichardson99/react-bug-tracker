const { connection } = require("../../config/dbConnection");
const bcrypt = require("bcrypt");

const userData = async (userId) => {
  try {
    const user = await connection
      .promise()
      .execute(
        `SELECT id, full_name, email, profile_image 
      FROM users 
      WHERE id = ?`,
        [userId]
      )
      .then(([rows]) => rows[0]);

    return {
      status: 200,
      message: "User fetched successfully",
      data: user,
    };
  } catch (err) {
    console.error(err);

    return {
      status: 500,
      message: "There seems to be an issue retrieving your user data",
    };
  }
};

const registerUser = async (full_name, email, password) => {
  try {
    const userExists = await connection
      .promise()
      .execute(
        `SELECT email 
      FROM users 
      WHERE email = ?`,
        [email]
      )
      .then(([rows]) => {
        if (rows.length > 0) {
          return true;
        }

        return false;
      });

    if (userExists) {
      return {
        status: 409,
        message: "User already exists with that email address",
      };
    }

    const createdUserId = await connection
      .promise()
      .execute(
        `INSERT INTO users (full_name, email, password) 
        VALUES (?, ?, ?)`,
        [full_name, email, password]
      )
      .then(([rows]) => rows.insertId);

    return {
      status: 201,
      message: "Account created successfully!",
      userId: createdUserId,
      email,
    };
  } catch (err) {
    console.error(err);

    return {
      status: 500,
      message: "Oops.. Something seems to have gone wrong!",
    };
  }
};

const loginUser = async (email, password) => {
  const user = await connection
    .promise()
    .execute(
      `SELECT id, email, password 
      FROM users 
      WHERE email = ?`,
      [email]
    )
    .then(([rows]) => {
      if (rows.length > 0) {
        return rows[0];
      }

      return null;
    });

  if (!user) {
    return {
      status: 404,
      message: "No user exists with that email address",
    };
  }

  const match = bcrypt.compareSync(password, user.password);

  if (!match) {
    return { status: 401, message: "Invalid email/password" };
  }

  return {
    status: 200,
    message: "Login successful!",
    userId: user.id,
    email: user.email,
  };
};

const resetUserPassword = async (email) => {
  const user = await connection
    .promise()
    .execute(
      `SELECT id, email 
    FROM users 
    WHERE email = ?`,
      [email]
    )
    .then(([rows]) => {
      if (rows.length > 0) {
        return rows[0];
      }

      return null;
    });

  if (!user) {
    return {
      status: 404,
      message: "No user exists with that email address",
    };
  }

  return {
    status: 200,
    user: {
      id: user.id,
      email: user.email,
    },
  };
};

const updateUserPassword = async (id, password) => {
  try {
    connection.execute(
      `UPDATE users 
    SET password = ? 
    WHERE id = ?`,
      [password, id]
    );

    return {
      status: 200,
      message: "Password reset successful!",
    };
  } catch (err) {
    console.error(err);

    return {
      status: 500,
      message: "Oops.. Something seems to have gone wrong!",
    };
  }
};

const uploadUserProfileImage = async (url, userId) => {
  try {
    connection.execute(
      `UPDATE users 
      SET profile_image = ?
      WHERE id = ?`,
      [url, userId]
    );

    return {
      status: 201,
      message: "Uploaded profile image successfully",
    };
  } catch {
    return {
      status: 400,
      message: "Upload failed",
    };
  }
};

module.exports = {
  userData,
  registerUser,
  loginUser,
  resetUserPassword,
  updateUserPassword,
  uploadUserProfileImage,
};
