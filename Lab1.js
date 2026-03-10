// =============================================
// BÀI THỰC HÀNH 1: MONGODB - CRUD Operation
// MSSV: 21522484
// =============================================

// =============================================
// 2.1 Tạo cơ sở dữ liệu
// =============================================
use("21522484-IE213");

// =============================================
// 2.2 Thêm documents vào collection employees
// =============================================
print("=== 2.2: Thêm documents vào collection employees ===");
db.employees.insertMany([
  { "id": 1, "name": { "first": "John", "last": "Doe" }, "age": 48 },
  { "id": 2, "name": { "first": "Jane", "last": "Doe" }, "age": 16 },
  { "id": 3, "name": { "first": "Alice", "last": "A" }, "age": 32 },
  { "id": 4, "name": { "first": "Bob", "last": "B" }, "age": 64 }
]);

// =============================================
// 2.3 Tạo unique index cho trường id
// =============================================
print("\n=== 2.3: Tạo unique index cho trường id ===");
db.employees.createIndex({ "id": 1 }, { unique: true });

// =============================================
// 2.4 Tìm document có first = "John", last = "Doe"
// =============================================
print("\n=== 2.4: Tìm document có first = John, last = Doe ===");
const johnDoe = db.employees.find({
  "name.first": "John",
  "name.last": "Doe"
}).toArray();
printjson(johnDoe);

// =============================================
// 2.5 Tìm người có tuổi > 30 và < 60
// =============================================
print("\n=== 2.5: Tìm người có tuổi > 30 và < 60 ===");
const ageRange = db.employees.find({
  age: { $gt: 30, $lt: 60 }
}).toArray();
printjson(ageRange);

// =============================================
// 2.6 Thêm document có middle name
// =============================================
print("\n=== 2.6: Thêm documents có middle name ===");
db.employees.insertMany([
  { "id": 5, "name": { "first": "Rooney", "middle": "K", "last": "A" }, "age": 30 },
  { "id": 6, "name": { "first": "Ronaldo", "middle": "T", "last": "B" }, "age": 60 }
]);

print("\n=== 2.6: Tìm tất cả documents có middle name ===");
const hasMiddleName = db.employees.find({
  "name.middle": { $exists: true }
}).toArray();
printjson(hasMiddleName);

// =============================================
// 2.7 Xoá trường middle khỏi các document có nó
// =============================================
print("\n=== 2.7: Xoá trường middle khỏi các document có nó ===");
const deleteMiddleResult = db.employees.updateMany(
  { "name.middle": { $exists: true } },
  { $unset: { "name.middle": "" } }
);
print(`Số documents đã cập nhật: ${deleteMiddleResult.modifiedCount}`);

// =============================================
// 2.8 Thêm trường organization: "UIT" cho tất cả
// =============================================
print("\n=== 2.8: Thêm trường organization: 'UIT' cho tất cả ===");
const addOrgResult = db.employees.updateMany(
  {},
  { $set: { organization: "UIT" } }
);
print(`Số documents đã cập nhật: ${addOrgResult.modifiedCount}`);

// =============================================
// 2.9 Sửa organization thành "USSH" cho id = 5 và 6
// =============================================
print("\n=== 2.9: Sửa organization thành 'USSH' cho id = 5 và 6 ===");
const updateOrgResult = db.employees.updateMany(
  { id: { $in: [5, 6] } },
  { $set: { organization: "USSH" } }
);
print(`Số documents đã cập nhật: ${updateOrgResult.modifiedCount}`);

// =============================================
// 2.10 Tính tổng tuổi và tuổi trung bình theo tổ chức
// =============================================
print("\n=== 2.10: Tính tổng tuổi và tuổi trung bình theo tổ chức ===");
const stats = db.employees.aggregate([
  {
    $group: {
      _id: "$organization",
      totalAge: { $sum: "$age" },
      avgAge: { $avg: "$age" },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      organization: "$_id",
      totalAge: 1,
      avgAge: { $round: ["$avgAge", 2] },
      count: 1,
      _id: 0
    }
  }
]).toArray();
printjson(stats);

// =============================================
// KIỂM TRA KẾT QUẢ CUỐI CÙNG
// =============================================
print("\n=== KIỂM TRA TẤT CẢ DOCUMENTS TRONG COLLECTION ===");
const allEmployees = db.employees.find().toArray();
printjson(allEmployees);

print("\n=== HOÀN THÀNH TẤT CẢ CÁC BÀI TẬP ===");