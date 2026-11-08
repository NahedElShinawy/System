// 1. هيكلة بيانات الطالب (Class & Constructor)
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades; // مصفوفة من 3 درجات مثلاً [80, 75, 90]
    this.attendance = attendance; // نسبة الحضور رقمية مثلاً 80
  }

  // دالة حساب المتوسط (باستخدام reduce)
  calculateAverage() {
    const sum = this.grades.reduce((total, grade) => total + grade, 0);
    return sum / this.grades.length;
  }

  // دالة التقدير بناءً على المتوسط
  getGradeLetter() {
    const avg = this.calculateAverage();
    if (avg >= 85) return 'A';
    if (avg >= 75) return 'B';
    if (avg >= 65) return 'C';
    if (avg >= 50) return 'D';
    if (avg >= 40) return 'E';
    return 'F';
  }

  // دالة النتيجة النهائية (شرطين: المتوسط >= 50 والحضور >= 75)
  getResult() {
    const avg = this.calculateAverage();
    if (avg >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

// 3. نظام تشغيل الجامعة (Objects Array)
const studentsList = [
  new Student(1, "محمد", [90, 85, 88], 85),
  new Student(2, "احمد", [45, 42, 44], 80), // متعثر (متوسطه بين 40 و 49)
  new Student(3, "سها", [70, 75, 72 ], 90),
  new Student(4, "ناهد", [48, 41, 43], 70)  // متعثر (متوسطه بين 40 و 49)
];

console.log("=== تقارير جميع الطلاب الأساسية ===");

studentsList.forEach(student => {
   console.log(`الاسم: ${student.name} | المتوسط: ${student.calculateAverage().toFixed(1)} | التقدير: ${student.getGradeLetter()} | النتيجة: ${student.getResult()}`);
});


// 4. لجنة الرأفة (Array Methods)

// أ. الاستخراج: استخراج الطلاب الذين تتراوح متوسطاتهم بين 40 و 49
let strugglingStudents = studentsList.filter(student => {
  let avg = student.calculateAverage();
  return avg >= 40 && avg < 50;
});

// ب. المعالجة: استخدام map لإضافة 5 درجات رأفة لمتوسطاتهم
let mercyAverages = strugglingStudents.map(student => {
  let oldAvg = student.calculateAverage();
  return oldAvg + 5; // إضافة 5 درجات رأفة
});

// ج. التحليل: استخدام reduce لجمع المتوسطات الجديدة بعد التعديل
let totalMercyAverages = mercyAverages.reduce((sum, avg) => sum + avg, 0);

// د. متوسط الرأفة مع "درع حماية" لمنع القسمة على صفر
let finalMercyAverage = strugglingStudents.length > 0 
  ? totalMercyAverages / strugglingStudents.length 
  : 0;


// 5. المخرجات النهائية (Console Logging)

console.log("\n=== قائمة الطلاب المتعثرين المشمولين بالرأفة ===");
strugglingStudents.forEach(s => {
  console.log(`- الطالب: ${s.name} (المتوسط القديم: ${s.calculateAverage()})`);
});

console.log(`\nمتوسط درجات الطلاب المتعثرين بعد تطبيق الرأفة: ${finalMercyAverage.toFixed(1)}`);
