import Role from "../models/role.js";

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    if (!roles || roles.length === 0) {
      return res.status(404).json({
        error: "No roles found",
        message: "No roles found in the database",
      });
    }
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const getRolesbyId = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);
    if (!role) {
      return res
        .status(404)
        .json({ error: "Role not found", message: error.message });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error("Error fetching Role by ID:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const createRoles = async (req, res) => {
  try {
    const newRole = new Role(req.body);
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (error) {
    console.error("Error creating role:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const updateRoles = async (req, res) => {
  try {
    const roleId = req.params.id;
    const updatedRole = await Role.findByIdAndUpdate(roleId, req.body, {
      new: true,
    });
    if (!updatedRole) {
      return res
        .status(404)
        .json({ error: "Role not found", message: error.message });
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    console.error("Error updating roles:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const deleteRolesbyId = async (req, res) => {
  try {
    const roleId = req.params.id;
    const deletedRole = await Role.findByIdAndDelete(roleId);
    if (!deletedRole) {
      return res
        .status(404)
        .json({ error: "Role not found", message: error.message });
    }
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting Role:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export { getAllRoles, getRolesbyId, createRoles, updateRoles, deleteRolesbyId };
