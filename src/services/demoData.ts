import { User, Course, CourseContent, Enrollment, ActivityLog } from '../types';
import { StorageService } from './storage';
import { ASSETS } from '../assets';

export class DemoDataService {
  static initialize(force: boolean = false): void {
    const keys = StorageService.getKeys();
    const isInitialized = StorageService.get<boolean>(keys.INITIALIZED, false);

    // If already initialized and not forced, ensure default accounts exist
    if (isInitialized && !force) {
      this.ensureDefaultAccountsExist();
      return;
    }

    // 1. Initial Users (Admin + Demo Student + Sample Students)
    const initialUsers: User[] = [
      {
        id: 'admin-1',
        fullName: 'M/Ahmed Fadel',
        phone: '01018432929',
        parentPhone: '01018432929',
        email: 'admin808@thesniper.com',
        password: 'M.ahmed0fadel',
        role: 'admin',
        status: 'active',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'student-demo-1',
        fullName: 'عمر خالد محمود الشناوي',
        phone: '01012345678',
        parentPhone: '01198765432',
        email: 'student@thesniper.com',
        password: 'Student2026!',
        role: 'student',
        status: 'active',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'student-demo-2',
        fullName: 'مريم محمد عبد الرحمن يوسف',
        phone: '01234567890',
        parentPhone: '01512345678',
        email: 'mariam.youssef@thesniper.com',
        password: 'Student2026!',
        role: 'student',
        status: 'active',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'student-demo-3',
        fullName: 'يوسف طارق السيد إبراهيم',
        phone: '01099887766',
        parentPhone: '01155443322',
        email: 'youssef.tarek@thesniper.com',
        password: 'Student2026!',
        role: 'student',
        status: 'active',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    // 2. Initial Courses
    const initialCourses: Course[] = [
      {
        id: 'course-3rd-grammar',
        title: 'كبسولة الجرامر الشاملة - الصف الثالث الثانوي',
        description: 'شرح تفصيلي ومبسط لجميع قواعد منهج الثانوية العامة (Units 1-12) مع كشف أسرار التريكات وحل أكثر من 500 سؤال وزاري متميز.',
        image: ASSETS.courseGrammar,
        price: 180,
        grade: 'third',
        gradeLabel: 'الصف الثالث الثانوي',
        isPopular: true,
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'course-3rd-exam',
        title: 'معسكر ليلة الامتحان والمراجعة النهائية - ثانوية عامة',
        description: 'المراجعة النهائية المكثفة: حل امتحانات الوزارة السابقة، صيد أفكار القطع الخارجية، مهارات كتابة المقال والقصة (Great Expectations).',
        image: ASSETS.courseExam,
        price: 220,
        grade: 'third',
        gradeLabel: 'الصف الثالث الثانوي',
        isPopular: true,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'course-2nd-skills',
        title: 'كورس الترجمة والمهارات المتقدمة - الصف الثاني الثانوي',
        description: 'تطوير شامل لمهارات الترجمة الفورية والاحترافية، حفظ الكلمات الذهبية، وحل القطع الصعبة بأسلوب القناص The Sniper.',
        image: ASSETS.courseGrammar,
        price: 150,
        grade: 'second',
        gradeLabel: 'الصف الثاني الثانوي',
        isPopular: false,
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'course-1st-foundation',
        title: 'تأسيس اللغة الإنجليزية الشامل - الصف الأول الثانوي',
        description: 'بناء الأساس المتين من البداية: ضبط الأزمنة، التراكيب النحوية، وطرق استيعاب المنهج الجديد والتفوق في الامتحانات الإلكترونية.',
        image: ASSETS.courseExam,
        price: 120,
        grade: 'first',
        gradeLabel: 'الصف الأول الثانوي',
        isPopular: false,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    // 3. Initial Course Content (Videos & PDFs)
    const initialContent: CourseContent[] = [
      // Content for Course 1 (Grammar 3rd Sec)
      {
        id: 'content-g-1',
        courseId: 'course-3rd-grammar',
        title: 'المحاضرة الأولى: أسرار أزمنة الماضي (Past Simple, Continuous & Perfect)',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: 'شرح شامل للفروق الدقيقة بين الماضي البسيط والماضي المستمر والماضي التام مع تدريبات عملية وتريكات كتاب المدرسة.',
        duration: '52 دقيقة',
        createdAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'content-g-2',
        courseId: 'course-3rd-grammar',
        title: 'مذكرة كبسولة الماضي والتمارين المحلولة (PDF)',
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        description: 'مذكرة منسقة وجاهزة للطباعة تحتوي على تلخيص القواعد وجدول الكلمات الدالة وأكثر من 100 تدريب بنظام اختر.',
        fileSize: '4.2 MB',
        pageCount: 18,
        createdAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'content-g-3',
        courseId: 'course-3rd-grammar',
        title: 'المحاضرة الثانية: المضارع التام والمضارع التام المستمر (Present Perfect Secrets)',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description: 'فك شفرة منذ و لمدة (Since & For) واستخدامات Just, Already, Yet وكيفية التفرقة بين Gone to و Been to.',
        duration: '48 دقيقة',
        createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'content-g-4',
        courseId: 'course-3rd-grammar',
        title: 'شيت واجب المحاضرة الثانية وملف الإجابات النموذجية (PDF)',
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        description: 'شيت الواجب المنزلي المعتمد لاختبار مدى فهمك مع تفسير لغوي لكل إجابة لتعظيم الاستفادة.',
        fileSize: '2.8 MB',
        pageCount: 12,
        createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
      },

      // Content for Course 2 (Exam Revision 3rd Sec)
      {
        id: 'content-e-1',
        courseId: 'course-3rd-exam',
        title: 'ورشة عمل: استراتيجيات التعامل مع قطعة الفهم الصعبة (Comprehension)',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description: 'طريقة مسح النص السريع (Skimming & Scanning)، تخمين معاني الكلمات من السياق، وحل أسئلة الاستنتاج.',
        duration: '65 دقيقة',
        createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'content-e-2',
        courseId: 'course-3rd-exam',
        title: 'ملزمة أقوى 50 قطعة فهم متوقعة ونماذج الإجابة (PDF)',
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        description: 'تجميعة لأهم القطع ذات الأفكار الفلسفية والعلمية والاجتماعية التي تكررت في الامتحانات التجريبية.',
        fileSize: '6.5 MB',
        pageCount: 35,
        createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'content-e-3',
        courseId: 'course-3rd-exam',
        title: 'المحاضرة الذهبية: فن كتابة المقال والبريد الإلكتروني (Essay & Email Skills)',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description: 'هيكل المقال المثالي، صياغة الجملة الافتتاحية (Hook & Thesis Statement)، والروابط الانتقالية الرائعة.',
        duration: '55 دقيقة',
        createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
      },

      // Content for Course 3 (Skills 2nd Sec)
      {
        id: 'content-s-1',
        courseId: 'course-2nd-skills',
        title: 'محاضرة قواعد الترجمة من العربية إلى الإنجليزية والعكس',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        description: 'ترتيب الجملة الإنجليزية، التعامل مع الفعل "كان" و "إن"، والترجمة الدقيقة للتعبيرات والمصطلحات الدارجة.',
        duration: '45 دقيقة',
        createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'content-s-2',
        courseId: 'course-2nd-skills',
        title: 'معجم القناص لأهم 1000 كلمة في الترجمة والمقال (PDF)',
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        description: 'كتيب الكلمات والمصطلحات السياسية، الاقتصادية، والبيئية الضرورية لكتابة موضوعات متميزة.',
        fileSize: '5.1 MB',
        pageCount: 28,
        createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
      },

      // Content for Course 4 (1st Sec Foundation)
      {
        id: 'content-f-1',
        courseId: 'course-1st-foundation',
        title: 'المحاضرة التأسيسية: تكوين الجملة وأزمنة الفعل الأساسية',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        description: 'شرح تفاعلي لبداية المرحلة الثانوية بقوة وثقة وفهم عميق للغة دون حفظ أعمى.',
        duration: '40 دقيقة',
        createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'content-f-2',
        courseId: 'course-1st-foundation',
        title: 'مذكرة التأسيس وقواعد الوحدة الأولى (PDF)',
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        description: 'مذكرة كبسولة الوحدة الأولى مع مفردات الحفظ والتمارين التفاعلية.',
        fileSize: '3.1 MB',
        pageCount: 15,
        createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    // 4. Initial Enrollments
    const initialEnrollments: Enrollment[] = [
      {
        id: 'enr-demo-1',
        userId: 'student-demo-1',
        courseId: 'course-3rd-grammar',
        enrolledAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'enr-demo-2',
        userId: 'student-demo-1',
        courseId: 'course-3rd-exam',
        enrolledAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'enr-demo-3',
        userId: 'student-demo-2',
        courseId: 'course-3rd-grammar',
        enrolledAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'enr-demo-4',
        userId: 'student-demo-3',
        courseId: 'course-2nd-skills',
        enrolledAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    // 5. Initial Activity Logs
    const initialLogs: ActivityLog[] = [
      {
        id: 'log-seed-1',
        action: 'ADD_COURSE',
        actionTitle: 'إضافة كورس جديد',
        description: 'تم إضافة كورس "كبسولة الجرامر الشاملة - الصف الثالث الثانوي" للمنصة',
        userId: 'admin-1',
        userName: 'M/Ahmed Fadel',
        userRole: 'admin',
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'log-seed-2',
        action: 'ADD_CONTENT',
        actionTitle: 'إضافة محتوى تعليمي',
        description: 'تم إضافة فيديو ومذكرات PDF للمحاضرة الأولى في كورس الجرامر',
        userId: 'admin-1',
        userName: 'M/Ahmed Fadel',
        userRole: 'admin',
        createdAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'log-seed-3',
        action: 'ADD_COURSE',
        actionTitle: 'إضافة كورس جديد',
        description: 'تم إضافة كورس "معسكر ليلة الامتحان والمراجعة النهائية"',
        userId: 'admin-1',
        userName: 'M/Ahmed Fadel',
        userRole: 'admin',
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'log-seed-4',
        action: 'STUDENT_REGISTRATION',
        actionTitle: 'تسجيل طالب جديد',
        description: 'سجل الطالب "عمر خالد محمود الشناوي" حساباً جديداً بالمنصة',
        userId: 'student-demo-1',
        userName: 'عمر خالد محمود الشناوي',
        userRole: 'student',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'log-seed-5',
        action: 'STUDENT_ENROLLMENT',
        actionTitle: 'اشتراك طالب في كورس',
        description: 'اشترك الطالب "عمر خالد محمود الشناوي" في كورس الجرامر الشامل',
        userId: 'student-demo-1',
        userName: 'عمر خالد محمود الشناوي',
        userRole: 'student',
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    // Persist all demo data
    StorageService.set(keys.USERS, initialUsers);
    StorageService.set(keys.COURSES, initialCourses);
    StorageService.set(keys.COURSE_CONTENT, initialContent);
    StorageService.set(keys.ENROLLMENTS, initialEnrollments);
    StorageService.set(keys.LOGS, initialLogs);
    StorageService.set(keys.INITIALIZED, true);
  }

  private static ensureDefaultAccountsExist(): void {
    const keys = StorageService.getKeys();
    const users = StorageService.get<User[]>(keys.USERS, []);

    // 1. Ensure Admin Account (admin808@thesniper.com)
    const adminIndex = users.findIndex(u => u.email.toLowerCase() === 'admin808@thesniper.com');
    if (adminIndex === -1) {
      users.unshift({
        id: 'admin-1',
        fullName: 'M/Ahmed Fadel',
        phone: '01018432929',
        parentPhone: '01018432929',
        email: 'admin808@thesniper.com',
        password: 'M.ahmed0fadel',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
      });
    } else {
      users[adminIndex].password = 'M.ahmed0fadel';
      users[adminIndex].role = 'admin';
      users[adminIndex].status = 'active';
    }

    // 2. Ensure Admin Alias (admin@thesniper.com)
    const adminAliasIndex = users.findIndex(u => u.email.toLowerCase() === 'admin@thesniper.com');
    if (adminAliasIndex === -1) {
      users.push({
        id: 'admin-alias',
        fullName: 'M/Ahmed Fadel (Admin)',
        phone: '01018432929',
        parentPhone: '01018432929',
        email: 'admin@thesniper.com',
        password: 'admin1234',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
      });
    } else {
      users[adminAliasIndex].role = 'admin';
      users[adminAliasIndex].status = 'active';
    }

    // 3. Ensure Student Demo Account (student@thesniper.com)
    const studentIndex = users.findIndex(u => u.email.toLowerCase() === 'student@thesniper.com');
    if (studentIndex === -1) {
      users.push({
        id: 'student-demo-1',
        fullName: 'عمر خالد محمود الشناوي',
        phone: '01012345678',
        parentPhone: '01198765432',
        email: 'student@thesniper.com',
        password: 'Student2026!',
        role: 'student',
        status: 'active',
        createdAt: new Date().toISOString(),
      });
    } else {
      users[studentIndex].role = 'student';
      users[studentIndex].status = 'active';
    }

    // 4. Ensure Student Alias (ziad.ahmed@example.com)
    const ziadIndex = users.findIndex(u => u.email.toLowerCase() === 'ziad.ahmed@example.com');
    if (ziadIndex === -1) {
      users.push({
        id: 'student-demo-ziad',
        fullName: 'زياد أحمد عبد الله',
        phone: '01019988776',
        parentPhone: '01122334455',
        email: 'ziad.ahmed@example.com',
        password: 'student123',
        role: 'student',
        status: 'active',
        createdAt: new Date().toISOString(),
      });
    }

    StorageService.set(keys.USERS, users);
  }
}
