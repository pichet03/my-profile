import React, { useState, useRef } from 'react';
import { Ionicons, Feather, Fontisto, Entypo } from '@expo/vector-icons';
import { Sun2, Moon3, PinWave, Envelope, Phone } from 'reicon-react-native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
  Image,
  Linking, // 🔴 1. เพิ่มคำนี้เข้าไปครับ
  Platform, // 🔴 2. เพิ่มคำนี้เข้าไปด้วยครับ
  TextInput,
} from 'react-native';

// ==========================================
// ข้อมูลแปลภาษา (Translations)
// ==========================================
const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contact',
    },
    // --- ชื่อและข้อมูลภาษาอังกฤษ ---
    home: {
      greeting: "HELLO, I'M",
      name: 'Pichet Thimachai', // ดึงชื่อภาษาอังกฤษมาไว้ที่นี่
      role: 'A Creative Full Stack Developer based in Thailand.',
      downloadCv: 'Download CV',
    },
    about: {
      title: 'About Me',
      description:
        'A passionate developer dedicated to Machine Learning and Web Development, backed by a strong foundation in business statistics. Experienced in building and training AI models, particularly in Image Classification, as well as data management and backend development for web applications. Eager to learn and adopt new technologies to solve complex problems efficiently',
      nameLabel: 'Name:',
      emailLabel: 'Email:',
      locationLabel: 'Location:',
      locationValue: 'Khon Kaen, Thailand',
      freelanceLabel: 'Freelance:',
      freelanceValue: 'Available',
      skillsTitle: 'My Skills',
      skillsTitle1: 'Programming Languages',
      skillsTitle2: 'Machine Learning & AI',
      skillsTitle3: 'Web & Backend Development',
      skillsTitle4: 'IT Support & Configuration',
      skillsTitle5: 'Development Tools & IDEs',
      skillsTitle6: 'Software Installation & Configuration',
      skillsTitle7: 'System Maintenance',
    },
    portfolio: {
      title: 'My Portfolio',
      subtitle: 'Here are some of my recent works and projects.',
      viewProject: 'View Project',
      project1Title: 'SmartWaste Realtime Analysis', // 🔴 เพิ่มชื่อภาษาอังกฤษ
      project1Category: 'Web Application',
    },
    blog: {
      title: 'Latest News & Articles',
      subtitle: 'My thoughts on technology, development, and design.',
      readMore: 'Read More ➔',
      post1Title: 'How to build a website with React Native Web',
      post2Title: 'Understanding Modern UI/UX Design',
    },
    contact: {
      title: 'Get In Touch',
      subtitle:
        'Feel free to reach out for collaborations or just a friendly hello.',
      infoTitle: 'Contact Information',
      location: 'Sawathi, Khon Kaen, Thailand', // ดึงข้อมูลสถานที่ปัจจุบันของคุณมาให้ครับ
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      sendButton: 'Send Message',
    },
  },
  th: {
    nav: {
      home: 'หน้าแรก',
      about: 'เกี่ยวกับฉัน',
      portfolio: 'ผลงาน',
      blog: 'บทความ',
      contact: 'ติดต่อ',
    },
    // --- ชื่อและข้อมูลภาษาไทย ---
    home: {
      greeting: 'สวัสดี ผมคือ',
      name: 'พิเชฐ ธิมาไชย', // ดึงชื่อภาษาไทยมาไว้ที่นี่
      role: 'นักพัฒนา Full Stack อาศัยอยู่ในประเทศไทย',
      downloadCv: 'ดาวน์โหลดเรซูเม่',
    },
    about: {
      title: 'เกี่ยวกับฉัน',
      description:
        'นักพัฒนาที่มีความหลงใหลในงานด้าน Machine Learning และ Web Development มีพื้นฐานความเข้าใจด้านสถิติธุรกิจที่แข็งแกร่ง มีประสบการณ์ในการสร้างและฝึกสอนโมเดลปัญญาประดิษฐ์ โดยเฉพาะงานด้าน Image Classification รวมไปถึงการจัดการข้อมูลและการพัฒนา Backend สำหรับเว็บแอปพลิเคชัน พร้อมเรียนรู้เทคโนโลยีใหม่ๆ เพื่อนำมาใช้แก้ปัญหาอย่างมีประสิทธิภาพ',
      nameLabel: 'ชื่อ:',
      emailLabel: 'อีเมล:',
      locationLabel: 'ที่อยู่:',
      locationValue: 'ขอนแก่น, ประเทศไทย',
      freelanceLabel: 'รับงานอิสระ:',
      freelanceValue: 'รับงาน',
      skillsTitle: 'ทักษะของฉัน',
      skillsTitle1: 'ภาษาโปรแกรม',
      skillsTitle2: 'การเรียนรู้ของเครื่องและปัญญาประดิษฐ์',
      skillsTitle3: 'การพัฒนาเว็บไซต์และระบบหลังบ้าน',
      skillsTitle4: 'การสนับสนุนด้านไอทีและการตั้งค่าระบบ',
      skillsTitle5: 'เครื่องมือพัฒนาซอฟต์แวร์และ IDE',
      skillsTitle6: 'การติดตั้งและตั้งค่าซอฟต์แวร์',
      skillsTitle7: 'แก้ปัญหาทางเทคนิค',
      skillsTitle8: '',
    },
    portfolio: {
      title: 'ผลงานของฉัน',
      subtitle: 'นี่คือตัวอย่างผลงานและโปรเจกต์บางส่วนที่ผ่านมาของผม',
      viewProject: 'ดูผลงาน',
      project1Title: 'ระบบคัดแยกขยะ AI', // 🔴 เพิ่มชื่อภาษาไทย
      project1Category: 'เว็บแอปพลิเคชัน',
    },
    blog: {
      title: 'บทความล่าสุด',
      subtitle: 'เรื่องราวและมุมมองเกี่ยวกับการพัฒนาซอฟต์แวร์และเทคโนโลยี',
      readMore: 'อ่านเพิ่มเติม ➔',
      post1Title: 'วิธีสร้างเว็บไซต์ด้วย React Native Web',
      post2Title: 'ทำความเข้าใจการออกแบบ UI/UX ในยุคปัจจุบัน',
    },
    contact: {
      title: 'ติดต่อฉัน',
      subtitle:
        'หากคุณมีโปรเจกต์ที่น่าสนใจ หรือต้องการพูดคุย ทักทายมาได้เลยครับ',
      infoTitle: 'ข้อมูลการติดต่อ',
      location: 'ต.สาวะถี, จ.ขอนแก่น, ประเทศไทย',
      emailLabel: 'อีเมล',
      phoneLabel: 'เบอร์โทรศัพท์',
      namePlaceholder: 'ชื่อของคุณ',
      emailPlaceholder: 'อีเมลของคุณ',
      messagePlaceholder: 'ข้อความ...',
      sendButton: 'ส่งข้อความ',
    },
  },
};

export default function PortfolioWeb() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('en');
  // 🔴 1. เพิ่ม State สำหรับฟอร์มติดต่อ
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  // 🔴 1. สร้าง Ref เพื่อใช้สั่ง Scroll เลื่อนหน้าจอ
  const scrollViewRef = useRef(null);
  // 🔴 2. สร้าง State เพื่อเก็บว่าแต่ละ Section อยู่พิกัด Y ที่เท่าไหร่
  const [sectionY, setSectionY] = useState({
    Home: 0,
    About: 0,
    Portfolio: 0,
    Blog: 0,
    Contact: 0,
  });

  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const t = translations[lang];
  const theme = {
    bg: isDarkMode ? '#0F172A' : '#FFFFFF',
    navBg: isDarkMode ? '#0F172A' : '#F8FAFC',
    text: isDarkMode ? '#FFFFFF' : '#0F172A',
    subText: isDarkMode ? '#94A3B8' : '#64748B',
    accent: '#38BDF8',
    toggleBtn: isDarkMode ? '#FFFFFF' : '#000000',
    toggleText: isDarkMode ? '#000000' : '#FFFFFF',
    white: '#FFFF',
  };

  // 2. ต้องมีฟังก์ชันนี้
  const handleLayout = (name, event) => {
    const yPosition = event.nativeEvent.layout.y;
    // แนะนำให้ปรับเป็นแบบนี้ เพื่อป้องกัน Error "Too many re-renders" (Infinite Loop)
    setSectionY((prev) => {
      if (prev[name] === yPosition) return prev; // ถ้าตำแหน่งเดิม ไม่ต้องอัปเดต
      return { ...prev, [name]: yPosition };
    });
  };

  // --- แถบเมนูด้านบน ---
  const renderNavbar = () => (
    <View
      style={[
        styles.navbar,
        {
          backgroundColor: theme.navBg,
          borderBottomColor: isDarkMode ? '#1E293B' : '#E2E8F0',
        },
      ]}
    >
      <Text style={[styles.logo, { color: theme.text }]}>
        PT<Text style={{ color: theme.accent }}>.</Text>
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
        {!isMobile && (
          <View style={styles.menuContainer}>
            {['home', 'about', 'portfolio', 'blog', 'contact'].map(
              (itemKey) => {
                const tabName =
                  itemKey.charAt(0).toUpperCase() + itemKey.slice(1);
                return (
                  <TouchableOpacity
                    key={itemKey}
                    onPress={() => handleMenuPress(tabName)}
                  >
                    <Text
                      style={[
                        styles.menuItem,
                        { color: theme.subText },
                        activeTab === tabName && {
                          color: theme.accent,
                          fontWeight: 'bold',
                        },
                      ]}
                    >
                      {t.nav[itemKey]}
                    </Text>
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        )}

        <TouchableOpacity
          style={[styles.langBtn, { borderColor: theme.accent }]}
          onPress={() => setLang(lang === 'en' ? 'th' : 'en')}
        >
          <Text style={{ color: theme.text, fontWeight: 'bold' }}>
            {lang.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleBtn,
            {
              backgroundColor: theme.toggleBtn,
              // เพิ่มการจัดกึ่งกลางให้ไอคอน
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          onPress={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? (
            <Sun2 weight="Filled" size={20} color={theme.toggleText} />
          ) : (
            // สมมติว่ามีไอคอน Moon สำหรับโหมดสว่าง (ถ้าชื่ออื่น ปรับแก้ได้เลยครับ)
            <Moon3 weight="Filled" size={20} color={theme.toggleText} />
          )}
        </TouchableOpacity>

        {isMobile && (
          <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
            <Text style={{ fontSize: 28, color: theme.text }}>☰</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  // --- เมนูสำหรับมือถือ ---
  const renderMobileMenu = () => (
    <Modal visible={isMenuOpen} animationType="fade" transparent={true}>
      <View style={[styles.fullScreenMenu, { backgroundColor: theme.bg }]}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsMenuOpen(false)}
        >
          <Text style={{ fontSize: 32, color: theme.text }}>✕</Text>
        </TouchableOpacity>

        {['home', 'about', 'portfolio', 'blog', 'contact'].map((itemKey) => {
          const tabName = itemKey.charAt(0).toUpperCase() + itemKey.slice(1);
          return (
            <TouchableOpacity
              key={itemKey}
              onPress={() => handleMenuPress(tabName)}
              style={{ marginVertical: 15 }}
            >
              <Text
                style={[
                  styles.mobileMenuText,
                  { color: theme.subText },
                  activeTab === tabName && {
                    color: theme.accent,
                    fontWeight: 'bold',
                  },
                ]}
              >
                {t.nav[itemKey]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Modal>
  );

  // --- หน้า Home ---
  const renderHome = () => (
    <View style={[styles.section, { alignItems: 'center' }]}>
      <Image
        source={require('./assets/profile.png')}
        style={[styles.profileImage, { borderColor: theme.accent }]}
      />
      <Text
        style={{
          color: theme.accent,
          fontSize: 18,
          marginBottom: 10,
          marginTop: 20,
        }}
      >
        {t.home.greeting}
      </Text>

      {/* 🔴 ดึงชื่อจาก translations (เปลี่ยนตามภาษา) */}
      <Text style={[styles.title, { color: theme.text, textAlign: 'center' }]}>
        {t.home.name}
      </Text>

      <Text
        style={{
          fontSize: 20,
          color: theme.subText,
          marginBottom: 30,
          lineHeight: 30,
          textAlign: 'center',
        }}
      >
        {t.home.role}
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: theme.accent, padding: 15, borderRadius: 8 }}
        onPress={() => {
          // 🔴 นำลิงก์ Direct Download ของ Google Drive มาใส่ตรงนี้
          const cvFileUrl =
            'https://drive.google.com/file/d/1yAyHFj9qqi7C0NTTuADvIktWrKntLVCM/view?usp=sharing';

          if (Platform.OS === 'web') {
            // โค้ดสำหรับเว็บ (บังคับดาวน์โหลด)
            const link = document.createElement('a');
            link.href = cvFileUrl;
            link.download = 'public/Resume.pdf'; // ตรงนี้อาจจะถูกข้ามไปถ้าโหลดผ่านเซิร์ฟเวอร์ภายนอก แต่ใส่ไว้เพื่อความสมบูรณ์ครับ
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            // โค้ดสำหรับ Mobile App
            Linking.openURL(cvFileUrl).catch((err) =>
              console.error('Error opening URL:', err),
            );
          }
        }}
      >
        <Text style={{ color: '#000', fontWeight: 'bold' }}>
          {t.home.downloadCv}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // --- ฟังก์ชันสร้างหลอดพลัง Skills ---
  const renderSkill = (skillName, percentage) => (
    <View style={styles.skillItem} key={skillName}>
      <View style={styles.skillHeader}>
        <Text style={{ color: theme.text, fontWeight: 'bold' }}>
          {skillName}
        </Text>
        <Text style={{ color: theme.subText }}>{percentage}</Text>
      </View>
      <View
        style={[
          styles.progressBarBg,
          { backgroundColor: isDarkMode ? '#1E293B' : '#E2E8F0' },
        ]}
      >
        <View
          style={[
            styles.progressBarFill,
            { width: percentage, backgroundColor: theme.accent },
          ]}
        />
      </View>
    </View>
  );

  // --- หน้า About ---
  const renderAbout = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        {t.about.title}
      </Text>
      {/* 🔴 เพิ่มเส้นขีดใต้หัวข้อตรงนี้ครับ (ดึงสีฟ้า theme.accent มาใช้) */}
      <View style={[styles.dividerabout, { backgroundColor: theme.white }]}>
        <View
          style={[styles.dividerabout2, { backgroundColor: theme.accent }]}
        />
      </View>
      <Text style={[styles.aboutText, { color: theme.subText }]}>
        {t.about.description}
      </Text>
      <View style={styles.infoGrid}>
        {[
          //  ดึงชื่อจาก t.home.name (เพื่อให้เปลี่ยนตามภาษาเหมือนหน้า Home)
          { label: t.about.nameLabel, value: t.home.name },
          { label: t.about.emailLabel, value: 'poaloa232@gmila.com' },
          { label: t.about.locationLabel, value: t.about.locationValue },
          { label: t.about.freelanceLabel, value: t.about.freelanceValue },
        ].map((info, index) => (
          <View
            key={index}
            style={[styles.infoItem, { width: isMobile ? '100%' : '48%' }]}
          >
            <Text style={[styles.infoLabel, { color: theme.accent }]}>
              {info.label}
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              {info.value}
            </Text>
          </View>
        ))}
      </View>
      <Text style={[styles.subTitle, { color: theme.text }]}>
        {t.about.skillsTitle}
      </Text>
      <Text style={[styles.subTitle, { color: theme.text }]}>
        {t.about.skillsTitle1}
      </Text>
      <View style={styles.skillsContainer}>
        {renderSkill('HTML/CSS', '90%')}
        {renderSkill('Python', '80%')}
        {renderSkill('Django', '80%')}
        {renderSkill('React Native', '70%')}
        {renderSkill('React.js', '65%')}
        {renderSkill('JavaScript / TypeScript', '60%')}
        {renderSkill('Node.js', '60%')}
      </View>
      <Text style={[styles.subTitle, { color: theme.text }]}>
        {t.about.skillsTitle2}
      </Text>
      <View style={styles.skillsContainer}>
        {renderSkill('TensorFlow', '90%')}
        {renderSkill('Keras', '85%')}
        {renderSkill('Architectures', '80%')}
        {renderSkill('Computer Vision', '80%')}
        {renderSkill('ImageDataGenerator', '75%')}
      </View>
      <Text style={[styles.subTitle, { color: theme.text }]}>
        {t.about.skillsTitle3}
      </Text>
      <View style={styles.skillsContainer}>
        {renderSkill('React Native', '90%')}
        {renderSkill('React.js', '85%')}
        {renderSkill('HTML/CSS', '80%')}
        {renderSkill('JavaScript / TypeScript', '80%')}
        {renderSkill('Python', '75%')}
        {renderSkill('Node.js', '70%')}
      </View>
      <Text style={[styles.subTitle, { color: theme.text }]}>
        {t.about.skillsTitle4}
      </Text>
      <View style={styles.skillsContainer}>
        {renderSkill(t.about.skillsTitle6, '90%')}
        {renderSkill(t.about.skillsTitle7, '90%')}
      </View>
      <Text style={[styles.subTitle, { color: theme.text }]}>
        {t.about.skillsTitle5}
      </Text>
      <View style={styles.skillsContainer}>
        {renderSkill('Visual Studio Code ', '90%')}
        {renderSkill('Google Colab ', '90%')}
        {renderSkill('Git', '80%')}
        {renderSkill('AI-assisted tools', '70%')}
      </View>
    </View>
  );

  // --- ข้อมูลผลงานจำลอง (สามารถเปลี่ยนชื่อ รูป และหมวดหมู่ได้ตามจริง) ---
  const portfolioProjects = [
    {
      id: 1,
      //  ดึงชื่อจาก translations มาใส่แทนการพิมพ์ข้อความแข็งๆ
      title: t.portfolio.project1Title,
      category: t.portfolio.project1Category,
      img: require('./img/icon-SmartWaste-Realtime-Analysis.jpg'),
      link: 'https://recowaste.vercel.app/',
      github: 'https://github.com/your-username/recowaste', //  เพิ่มลิงก์ GitHub ของโปรเจก
    },
    {
      id: 2,
      title: 'Food Delivery App',
      category: 'React Native',
      img: 'https://via.placeholder.com/400x300/1E293B/38BDF8?text=Project+2',
      link: 'https://play.google.com/store/apps/details?id=your.app.id', // 🔴 เพิ่มลิงก์ปลายทางตรงนี้
    },
    // ... โปรเจกต์อื่นๆ ก็ใส่ link เพิ่มเข้าไปให้ครบครับ
  ];
  const blogPosts = [
    {
      id: 1,
      title: t.blog.post1Title,
      date: 'Sep 23, 2026',
      category: 'Development',
      // สามารถเปลี่ยนเป็น require('./img/ชื่อรูป.jpg') ได้เหมือนหน้า Portfolio
      img: 'https://via.placeholder.com/400x200/1E293B/38BDF8?text=Blog+1',
      link: 'https://example.com/blog/1',
    },
    {
      id: 2,
      title: t.blog.post2Title,
      date: 'Aug 15, 2026',
      category: 'Design',
      img: 'https://via.placeholder.com/400x200/1E293B/FFD700?text=Blog+2',
      link: 'https://example.com/blog/2',
    },
  ];

  // --- หน้า Portfolio (โปรไฟล์ผลงาน) ---
  const renderPortfolio = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        {t.portfolio.title}
      </Text>
      {/* 🔴 เพิ่มเส้นขีดใต้หัวข้อตรงนี้ครับ (ดึงสีฟ้า theme.accent มาใช้) */}
      <View style={[styles.dividerportfolio, { backgroundColor: theme.white }]}>
        <View
          style={[styles.dividerportfolio2, { backgroundColor: theme.accent }]}
        />
      </View>
      <Text style={[styles.aboutText, { color: theme.subText }]}>
        {t.portfolio.subtitle}
      </Text>

      <View style={styles.portfolioGrid}>
        {portfolioProjects.map((project) => (
          <View
            key={project.id}
            // เช็คขนาดจอ: มือถือให้กว้าง 100%, จอคอมให้กว้าง 31% (เรียง 3 คอลัมน์พอดี)
            style={[
              styles.portfolioCard,
              {
                backgroundColor: isDarkMode ? '#1E293B' : '#F8FAFC',
                width: isMobile ? '100%' : '50%',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              },
            ]}
          >
            <Image
              source={
                typeof project.img === 'string'
                  ? { uri: project.img }
                  : project.img
              }
              style={styles.portfolioImage}
            />
            <View style={styles.portfolioCardContent}>
              <Text
                style={[styles.portfolioTitle, { color: theme.text }]}
                numberOfLines={1}
              >
                {project.title}
              </Text>
              <Text style={{ color: theme.accent, marginBottom: 15 }}>
                {project.category}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (project.link) {
                    Linking.openURL(project.link).catch((err) =>
                      console.error('Error opening URL:', err),
                    );
                  } else {
                    // ดักไว้เผื่อโปรเจกต์ไหนยังไม่มีลิงก์
                    alert('ลิงก์ผลงานนี้ยังไม่พร้อมใช้งานครับ');
                  }
                }}
              >
                <Text style={{ color: theme.text, fontWeight: 'bold' }}>
                  {t.portfolio.viewProject} ➔
                </Text>
              </TouchableOpacity>
              {/* 🔴 ปุ่ม GitHub: บังคับให้อยู่ ขวา-ล่าง-สุด ของการ์ด */}
              {project.github && (
                <TouchableOpacity
                  style={{
                    position: 'absolute', // บังคับลอยตัวอิสระ
                    bottom: 20, // ห่างจากขอบล่าง 20px
                    right: 20, // ห่างจากขอบขวา 20px
                  }}
                  onPress={() => {
                    Linking.openURL(project.github).catch((err) =>
                      console.error('Error', err),
                    );
                  }}
                >
                  <Ionicons name="logo-github" size={26} color={theme.text} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderBlog = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        {t.blog.title}
      </Text>
      <Text
        style={[styles.aboutText, { color: theme.subText, marginBottom: 20 }]}
      >
        {t.blog.subtitle}
      </Text>

      <View style={styles.blogGrid}>
        {blogPosts.map((post) => {
          const asset =
            typeof post.img === 'string' ? { uri: post.img } : post.img;

          return (
            <View
              key={post.id}
              style={[
                styles.blogCard,
                {
                  backgroundColor: theme.cardBg,
                  borderColor: theme.cardBorder,
                  width: isMobile ? '100%' : '48%', // บนมือถือแสดง 1 คอลัมน์ บนคอมแสดง 2 คอลัมน์
                },
              ]}
            >
              <Image source={asset} style={styles.blogImage} />

              <View style={styles.blogCardContent}>
                <View style={styles.blogMeta}>
                  <Text
                    style={{
                      color: theme.Gold,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    {post.category}
                  </Text>
                  <Text style={{ color: theme.subText, fontSize: 12 }}>
                    {post.date}
                  </Text>
                </View>

                <Text
                  style={[styles.blogTitle, { color: theme.text }]}
                  numberOfLines={2}
                >
                  {post.title}
                </Text>

                <TouchableOpacity
                  style={styles.readMoreBtn}
                  onPress={() => {
                    if (post.link)
                      Linking.openURL(post.link).catch((err) =>
                        console.error(err),
                      );
                  }}
                >
                  <Text style={{ color: theme.accent, fontWeight: 'bold' }}>
                    {t.blog.readMore}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
  const renderContact = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        {t.contact.title}
      </Text>
      <Text
        style={[styles.aboutText, { color: theme.subText, marginBottom: 40 }]}
      >
        {t.contact.subtitle}
      </Text>

      <View
        style={[
          styles.contactContainer,
          { flexDirection: isMobile ? 'column' : 'row' },
        ]}
      >
        {/* ส่วนข้อมูลการติดต่อ (ซ้าย) */}
        <View
          style={[styles.contactInfo, { width: isMobile ? '100%' : '40%' }]}
        >
          <Text style={[styles.contactInfoTitle, { color: theme.text }]}>
            {t.contact.infoTitle}
          </Text>

          <TouchableOpacity
            style={styles.contactInfoItem}
            onPress={() => {
              // เปลี่ยนเป็นอีเมลของคุณ
              Linking.openURL(
                'https://maps.app.goo.gl/Y3RfmqrPiCgfZUHb6',
              ).catch((err) => console.error(err));
            }}
          >
            <PinWave size={24} color={theme.accent} />
            <Text style={[styles.contactInfoText, { color: theme.subText }]}>
              {t.contact.location}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactInfoItem}
            onPress={() => {
              // เปลี่ยนเป็นอีเมลของคุณ
              Linking.openURL('mailto:poaloa232@gmail.com').catch((err) =>
                console.error(err),
              );
            }}
          >
            <Envelope size={24} color={theme.accent} />
            <Text style={[styles.contactInfoText, { color: theme.subText }]}>
              poaloa232@gmail.com
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactInfoItem}
            onPress={() => {
              // เปลี่ยน URL ด้านล่างให้เป็นลิงก์โปรไฟล์ Facebook ของคุณ
              Linking.openURL('https://www.facebook.com/poa555').catch((err) =>
                console.error(err),
              );
            }}
          >
            {/* ถ้าใช้ Lucide */}
            <Feather name="facebook" size={24} color={theme.accent} />
            <Text style={[styles.contactInfoText, { color: theme.subText }]}>
              Pichet Thimachai
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactInfoItem}
            onPress={() => {
              // เปลี่ยน URL ด้านล่างให้เป็นลิงก์โปรไฟล์ Facebook ของคุณ
              Linking.openURL('https://www.instagram.com/picht2/').catch(
                (err) => console.error(err),
              );
            }}
          >
            {/* ถ้าใช้ Lucide */}
            <Entypo name="instagram" size={24} color={theme.accent} />
            <Text style={[styles.contactInfoText, { color: theme.subText }]}>
              picet.pt
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactInfoItem}
            onPress={() => {
              // เปลี่ยน URL ด้านล่างให้เป็นลิงก์โปรไฟล์ Facebook ของคุณ
              Linking.openURL('https://line.me/ti/p/p2tIm3leco').catch((err) =>
                console.error(err),
              );
            }}
          >
            {/* ถ้าใช้ Lucide */}
            <Fontisto name="line" size={24} color={theme.accent} />
            <Text style={[styles.contactInfoText, { color: theme.subText }]}>
              Pichet Thimachai
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactInfoItem}
            onPress={() => {
              // เปลี่ยนเป็นเบอร์ของคุณ โดยใช้รูปแบบ tel: ตามด้วยเบอร์
              Linking.openURL('tel:0803179130').catch((err) =>
                console.error(err),
              );
            }}
          >
            <Phone color={theme.accent} size={24} />
            <Text style={[styles.contactInfoText, { color: theme.subText }]}>
              +66 803179130
            </Text>
          </TouchableOpacity>
        </View>

        {/* ส่วนฟอร์มการติดต่อ (ขวา) */}
        <View
          style={[styles.contactForm, { width: isMobile ? '100%' : '55%' }]}
        >
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.cardBg,
                color: theme.text,
                borderColor: theme.cardBorder,
              },
            ]}
            placeholder={t.contact.namePlaceholder}
            placeholderTextColor={theme.subText}
            value={senderName}
            onChangeText={setSenderName} // เก็บค่าชื่อเมื่อพิมพ์
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.cardBg,
                color: theme.text,
                borderColor: theme.cardBorder,
              },
            ]}
            placeholder={t.contact.emailPlaceholder}
            placeholderTextColor={theme.subText}
            keyboardType="email-address"
            value={senderEmail}
            onChangeText={setSenderEmail} // เก็บค่าอีเมลเมื่อพิมพ์
          />
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              {
                backgroundColor: theme.cardBg,
                color: theme.text,
                borderColor: theme.cardBorder,
              },
            ]}
            placeholder={t.contact.messagePlaceholder}
            placeholderTextColor={theme.subText}
            multiline={true}
            numberOfLines={5}
            value={senderMessage}
            onChangeText={setSenderMessage} // เก็บค่าข้อความเมื่อพิมพ์
          />

          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: theme.accent }]}
            onPress={() => {
              // 🔴 2. ฟังก์ชันจัดรูปแบบข้อความและสั่งเปิดแอปอีเมล
              if (!senderName || !senderMessage) {
                alert(
                  lang === 'th'
                    ? 'กรุณากรอกชื่อและข้อความ'
                    : 'Please enter your name and message.',
                );
                return;
              }

              // ตั้งค่าอีเมลปลายทางของคุณ
              const myEmail = 'poaloa232@gmail.com';
              // ตั้งหัวข้ออีเมล
              const subject = `ติดต่อจากเว็บไซต์: ${senderName}`;
              // จัดรูปแบบเนื้อหาอีเมล
              const body = `ชื่อ: ${senderName}\nอีเมลติดต่อกลับ: ${senderEmail}\n\nข้อความ:\n${senderMessage}`;

              // ใช้ encodeURIComponent เพื่อป้องกันปัญหาเว้นวรรคและภาษาไทยใน URL
              const mailtoUrl = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

              Linking.openURL(mailtoUrl).catch((err) =>
                console.error('Error sending email:', err),
              );
            }}
          >
            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>
              {t.contact.sendButton}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {renderNavbar()}
      {renderMobileMenu()}

      {/* 🔴 4. ใส่ ref ให้ ScrollView และเรนเดอร์ทุกส่วนต่อกันลงมา */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        scrollEventThrottle={16} // ทำให้ scroll ลื่นขึ้น
      >
        <View onLayout={(e) => handleLayout('Home', e)}>{renderHome()}</View>

        <View onLayout={(e) => handleLayout('About', e)}>{renderAbout()}</View>

        <View onLayout={(e) => handleLayout('Portfolio', e)}>
          {renderPortfolio()}
        </View>

        <View onLayout={(e) => handleLayout('Blog', e)}>{renderBlog()}</View>

        <View onLayout={(e) => handleLayout('Contact', e)}>
          {renderContact()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // 1. โครงสร้างหลักของแอปพลิเคชัน

  container: {
    flex: 1, // บังคับให้หน้าต่าง(View) หลักใช้พื้นที่ความสูงเต็มหน้าจออุปกรณ์
  },
  scrollContainer: {
    flexGrow: 0.5, //  ให้พื้นที่ Scroll ยืดออกไปจนสุดหน้าจอได้
    padding: 20, // เว้นระยะห่างเนื้อหาจากขอบหน้าจอซ้าย-ขวา-บน-ล่าง
    alignItems: 'center', // จัดเนื้อหาที่อยู่ภายในให้อยู่กึ่งกลางหน้าจอ (แนวนอน)
    justifyContent: 'center', // จัดเนื้อหาที่อยู่ภายในให้อยู่กึ่งกลางหน้าจอ (แนวตั้ง)
  },
  section: {
    width: '100%', // ให้ Section ขยายความกว้างเต็มพื้นที่ที่กำหนด
    maxWidth: 800, // จำกัดความกว้างสูงสุดไว้ที่ 800px เพื่อไม่ให้หน้าเว็บกว้างเกินไปเวลาเปิดบนจอคอมพิวเตอร์ใหญ่ๆ
    alignItems: 'flex-start', // จัดเนื้อหาภายใน Section (เช่น ข้อความ) ให้ชิดซ้ายเป็นค่าเริ่มต้น
    marginVertical: 20, // เว้นระยะห่างด้านบนและด้านล่างของแต่ละ Section
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  // 2. แถบนำทางด้านบน (Navbar)
  navbar: {
    flexDirection: 'row', // จัดเรียงโลโก้และกลุ่มเมนูให้อยู่ในบรรทัดเดียวกัน (แนวนอน)
    justifyContent: 'space-between', // ดันโลโก้ไปชิดซ้ายสุด และกลุ่มเมนูไปชิดขวาสุด
    alignItems: 'center', // จัดให้โลโก้และเมนูอยู่กึ่งกลางความสูงของ Navbar
    paddingHorizontal: 20, // เว้นระยะขอบซ้าย-ขวา ภายใน Navbar
    paddingVertical: 20, // เว้นระยะขอบบน-ล่าง ภายใน Navbar (ทำให้ Navbar ดูหนาขึ้น)
    borderBottomWidth: 1, // เส้นขอบล่างของ Navbar
    zIndex: 10, // ลำดับชั้นการแสดงผล (ยิ่งเยอะยิ่งอยู่บนสุด) เพื่อให้ Navbar ลอยอยู่เหนือเนื้อหาอื่นๆ
  },
  logo: {
    fontSize: 24, // ขนาดตัวอักษรของโลโก้
    fontWeight: 'bold', // ทำตัวอักษรโลโก้ให้หนา
  },
  menuContainer: {
    flexDirection: 'row', // จัดเรียงรายการเมนู (Home, About...) ในแนวนอน
    gap: 20, // ระยะห่างระหว่างปุ่มเมนูแต่ละอัน
    marginRight: 10, // ระยะห่างจากกลุ่มเมนูไปหาปุ่มเปลี่ยนภาษา
  },
  menuItem: {
    fontSize: 16, // ขนาดตัวอักษรของเมนู
    marginHorizontal: 10, // ระยะห่างซ้าย-ขวา ภายนอกของข้อความเมนู
  },
  langBtn: {
    paddingHorizontal: 12, // พื้นที่ว่างภายในปุ่มเปลี่ยนภาษา (ซ้าย-ขวา)
    paddingVertical: 8, // พื้นที่ว่างภายในปุ่มเปลี่ยนภาษา (บน-ล่าง)
    borderRadius: 8, // ความโค้งมนของมุมปุ่มเปลี่ยนภาษา
    borderWidth: 1, // ความหนาของเส้นขอบปุ่มเปลี่ยนภาษา
    marginLeft: 10, // ระยะห่างจากปุ่มเมนูด้านซ้าย
  },
  toggleBtn: {
    paddingHorizontal: 15, // พื้นที่ว่างภายในปุ่มสลับธีม (ซ้าย-ขวา)
    paddingVertical: 8, // พื้นที่ว่างภายในปุ่มสลับธีม (บน-ล่าง)
    borderRadius: 20, // ทำปุ่มให้มีความโค้งมนแบบแคปซูล (เพราะค่าเยอะ)
    marginLeft: 10, // ระยะห่างจากปุ่มที่อยู่ด้านซ้าย
  },

  // 3. รูปภาพโปรไฟล์ (หน้า Home)

  profileImage: {
    width: 250, // ความกว้างของรูปโปรไฟล์
    height: 250, // ความสูงของรูปโปรไฟล์ (ต้องเท่ากับความกว้างเพื่อทำวงกลม)
    borderRadius: 125, // ต้องมีค่าเป็นครึ่งหนึ่งของ width/height เสมอ เพื่อให้รูปเป็นวงกลมสมบูรณ์
    borderWidth: 4, // ความหนาของเส้นขอบรอบรูป
    marginBottom: 20, // ระยะห่างด้านล่างระหว่างรูปกับข้อความ
  },
  title: {
    fontSize: 40, // ขนาดตัวอักษรของชื่อ (เช่น ชื่อคุณ)
    fontWeight: '900', // ตัวหนามาก (เกือบหนาสุด)
    marginBottom: 10, // ระยะห่างด้านล่างของชื่อ
  },

  // 4. เมนู Pop-up (สำหรับหน้าจอมือถือ - Modal)

  fullScreenMenu: {
    flex: 1, // ให้ Modal บังเต็มหน้าจอ
    justifyContent: 'center', // จัดรายการเมนูให้อยู่กึ่งกลางหน้าจอ (แนวตั้ง)
    alignItems: 'center', // จัดรายการเมนูให้อยู่กึ่งกลางหน้าจอ (แนวนอน)
  },
  closeButton: {
    position: 'absolute', // ทำให้ปุ่มกากบาท(X) ลอยอิสระ ไม่ไปรบกวนเลย์เอาต์เมนู
    top: 20, // ระยะห่างจากขอบบนหน้าจอ
    right: 25, // ระยะห่างจากขอบขวาหน้าจอ
    padding: 10, // พื้นที่ให้กดปุ่มกากบาทได้ง่ายขึ้น
  },
  mobileMenuText: {
    fontSize: 28, // ขนาดตัวอักษรเมนูบนมือถือ (มักจะใหญ่กว่าจอคอมเพื่อให้กดง่าย)
  },

  // ==========================================
  // 5. สไตล์สำหรับหน้า About Me
  // ==========================================
  sectionTitle: {
    fontSize: 36, // ขนาดตัวอักษรหัวข้อใหญ่ (เช่น About Me)
    fontWeight: 'bold', // ตัวหนา
    marginBottom: 10, // ระยะห่างจากหัวข้อใหญ่ไปยังเนื้อหาด้านล่าง
  },
  dividerabout: {
    width: 160,
    height: 4,
    borderRadius: 2,
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center', // 🔴 เพิ่มคำสั่งนี้: จัดให้เส้นสีทอง(ลูก) อยู่กึ่งกลางแนวนอนอัตโนมัติ
  },
  dividerabout2: {
    width: 100,
    height: 4,
    borderRadius: 2,
    // ไม่ต้องใส่ marginLeft หรือ padding อะไรเลยครับ ระบบจะจัดกลางให้อัตโนมัติ
  },
  subTitle: {
    fontSize: 24, // ขนาดตัวอักษรหัวข้อย่อย (เช่น My Skills)
    fontWeight: 'bold', // ตัวหนา
    marginTop: 30, // ระยะห่างจากข้อมูลด้านบน
    marginBottom: 15, // ระยะห่างไปยังหลอดพลังด้านล่าง
  },
  aboutText: {
    fontSize: 16, // ขนาดตัวอักษรของข้อความแนะนำตัว
    lineHeight: 28, // ความสูงของบรรทัด (ยิ่งเยอะ ยิ่งห่างกัน ทำให้อ่านง่าย)
    marginBottom: 30, // ระยะห่างก่อนถึงส่วนข้อมูลส่วนตัว (Name, Email...)
  },

  // --- ส่วนข้อมูลส่วนตัว (Name, Email, Location) ---
  infoGrid: {
    flexDirection: 'row', // เรียงข้อมูล (Label กับ Value) ไปทางเดียวกัน (แนวนอน)
    flexWrap: 'wrap', // อนุญาตให้ตัดข้อความลงบรรทัดใหม่ได้ถ้าพื้นที่หน้าจอแคบเกินไป
    justifyContent: 'space-between', // กระจายคอลัมน์ข้อมูลให้อยู่ห่างกัน (ซ้าย-ขวา)
    width: '100%', // ให้ตารางข้อมูลกว้างเต็มที่ของ Section
  },
  infoItem: {
    flexDirection: 'row', // จัดเรียง Label (เช่น "Name:") และ Value (เช่น ชื่อคุณ) ให้อยู่บรรทัดเดียวกัน
    marginBottom: 15, // ระยะห่างแต่ละบรรทัดของข้อมูล
  },
  infoLabel: {
    fontWeight: 'bold', // ตัวหนาสำหรับหัวข้อ (เช่น Name:)
    width: 100, // ล็อกความกว้างของ Label ไว้ เพื่อให้ข้อมูล (Value) ที่อยู่ด้านหลังเรียงกันเป็นระเบียบ
    fontSize: 16, // ขนาดตัวอักษร
  },
  infoValue: {
    fontSize: 16, // ขนาดตัวอักษร
    flex: 1, // ปล่อยให้ Value (ข้อมูล) กินพื้นที่ส่วนที่เหลือทั้งหมดในบรรทัดนั้น
  },

  // --- ส่วนหลอดพลังทักษะ (Skills Progress Bar) ---
  skillsContainer: {
    width: '100%', // ให้กล่องทักษะกว้างเต็ม Section
  },
  skillItem: {
    marginBottom: 20, // ระยะห่างระหว่างหลอดพลังทักษะแต่ละอัน
  },
  skillHeader: {
    flexDirection: 'row', // เรียงชื่อทักษะ (เช่น React) กับเปอร์เซ็นต์ (เช่น 90%) ให้อยู่บรรทัดเดียวกัน
    justifyContent: 'space-between', // ดันชื่อทักษะไปซ้ายสุด และดันเปอร์เซ็นต์ไปขวาสุด
    marginBottom: 8, // ระยะห่างระหว่างชื่อทักษะกับตัวหลอดพลัง
  },
  progressBarBg: {
    width: '100%', // ความกว้างของหลอดพลังพื้นหลัง (หลอดเปล่า)
    height: 8, // ความหนาของหลอดพลัง
    borderRadius: 4, // ความโค้งมนของขอบหลอดพลัง
    overflow: 'hidden', // คำสั่งสำคัญ: ป้องกันไม่ให้สี (Fill) ที่เติมลงไป ล้นออกนอกความโค้งมนของหลอดพื้นหลัง
  },
  progressBarFill: {
    height: '100%', // ให้สีที่เติม มีความสูงเต็มหลอด
    borderRadius: 4, // ความโค้งมนของสีที่เติม (ควรเท่ากับหลอดพื้นหลัง)
  },
  // 6. สไตล์สำหรับหน้า Portfolio
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // ปัดผลงานลงบรรทัดใหม่ถ้าพื้นที่ไม่พอ
    justifyContent: 'space-between', // กระจายคอลัมน์ให้มีช่องไฟเท่ากัน
    width: '100%',
    marginTop: 10,
  },
  portfolioCard: {
    borderRadius: 12, // ขอบการ์ดผลงานมน
    overflow: 'hidden', // กันรูปภาพล้นขอบมุมที่มนไว้
    marginBottom: 24, // ระยะห่างด้านล่างระหว่างการ์ด
    borderWidth: 1, // เพิ่มเส้นขอบบางๆ ให้การ์ดดูมีมิติ
  },
  portfolioImage: {
    width: '100%',
    height: 200, // ความสูงของรูปผลงาน (ปรับได้ตามต้องการ)
    resizeMode: 'cover', // จัดรูปภาพให้เต็มกรอบโดยรักษาสัดส่วน
  },
  portfolioCardContent: {
    padding: 20, // พื้นที่ว่างภายในเนื้อหาใต้รูปภาพ
  },
  portfolioTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dividerportfolio: {
    width: 200,
    height: 4,
    borderRadius: 2,
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center', //  เพิ่มคำสั่งนี้: จัดให้เส้นสีทอง(ลูก) อยู่กึ่งกลางแนวนอนอัตโนมัติ
  },
  dividerportfolio2: {
    width: 140,
    height: 4,
    borderRadius: 2,
    // ไม่ต้องใส่ marginLeft หรือ padding อะไรเลยครับ ระบบจะจัดกลางให้อัตโนมัติ
  },
  // 7. สไตล์สำหรับหน้า Blog
  blogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  blogCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
  },
  blogImage: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  blogCardContent: {
    padding: 20,
  },
  blogMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  blogTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    lineHeight: 30,
  },
  readMoreBtn: {
    alignSelf: 'flex-start', // ให้ปุ่มหดขนาดพอดีกับข้อความ
    marginTop: 5,
  },
  // 8. สไตล์สำหรับหน้า Contact
  contactContainer: {
    justifyContent: 'space-between',
    width: '100%',
    gap: 30, // เว้นระยะห่างระหว่างคอลัมน์
  },
  contactInfo: {
    marginBottom: 30,
  },
  contactInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactInfoText: {
    fontSize: 16,
    marginLeft: 15,
  },
  contactForm: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top', // ให้ข้อความเริ่มพิมพ์จากด้านบนของกล่อง
  },
  submitBtn: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});
