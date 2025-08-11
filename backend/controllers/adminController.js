const Admin = require('../model/Admin');
const bcrypt = require('bcryptjs');

// Create default admin if not exists
exports.createDefaultAdmin = async () => {
  const exists = await Admin.findOne({ username: 'admin' });
  if (!exists) {
    await Admin.create({ username: 'admin', password: 'admin123' });
    console.log('Default admin created: admin / admin123');
  }
  const allAdmins = await Admin.find();
  console.log('All admins:', allAdmins);
};

// Force create default admin (delete all and create new)
exports.forceCreateDefaultAdmin = async (req, res) => {
  await Admin.deleteMany({});
  const admin = await Admin.create({ username: 'admin', password: 'admin123' });
  const allAdmins = await Admin.find();
  console.log('All admins after force create:', allAdmins);
  res.json({ message: 'Default admin recreated', admin });
};

exports.deleteAllAdmins = async (req, res) => {
  await Admin.deleteMany({});
  res.json({ message: 'All admins deleted' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username, password);
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log('Admin not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Register a new admin
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const exists = await Admin.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashedPassword });
    res.json({ message: 'Admin registered', admin: { username: admin.username } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 