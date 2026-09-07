import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Sun2, Moon3 } from 'reicon-react-native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
  Image,
  Linking, // 🔴 1. เพิ่มคำนี้เข้าไปครับ
  Platform, // 🔴 2. เพิ่มคำนี้เข้าไปด้วยครับ
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
        'I am a passionate Full Stack Developer based in Khon Kaen, Thailand. I have a strong interest in building modern, responsive web and mobile applications. I love learning new technologies and solving complex problems with clean code.',
      nameLabel: 'Name:',
      emailLabel: 'Email:',
      locationLabel: 'Location:',
      locationValue: 'Khon Kaen, Thailand',
      freelanceLabel: 'Freelance:',
      freelanceValue: 'Available',
      skillsTitle: 'My Skills',
    },
    portfolio: {
      title: 'My Portfolio',
      subtitle: 'Here are some of my recent works and projects.',
      viewProject: 'View Project',
      project1Title: 'SmartWaste Realtime Analysis', // 🔴 เพิ่มชื่อภาษาอังกฤษ
      project1Category: 'Web Application',
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
        'ผมเป็น Full Stack Developer ที่หลงใหลในการเขียนโค้ด อาศัยอยู่ที่จังหวัดขอนแก่น มีความสนใจในการสร้างเว็บและแอปพลิเคชันมือถือที่ทันสมัย ผมชอบเรียนรู้เทคโนโลยีใหม่ๆ และแก้ปัญหาด้วยโค้ดที่สะอาดสะอ้าน',
      nameLabel: 'ชื่อ:',
      emailLabel: 'อีเมล:',
      locationLabel: 'ที่อยู่:',
      locationValue: 'ขอนแก่น, ประเทศไทย',
      freelanceLabel: 'รับงานอิสระ:',
      freelanceValue: 'รับงาน',
      skillsTitle: 'ทักษะของฉัน',
    },
    portfolio: {
      title: 'ผลงานของฉัน',
      subtitle: 'นี่คือตัวอย่างผลงานและโปรเจกต์บางส่วนที่ผ่านมาของผม',
      viewProject: 'ดูผลงาน',
      project1Title: 'ระบบคัดแยกขยะ AI', // 🔴 เพิ่มชื่อภาษาไทย
      project1Category: 'เว็บแอปพลิเคชัน',
    },
  },
};

export default function PortfolioWeb() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('en');

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

  const handleMenuPress = (item) => {
    setActiveTab(item);
    setIsMenuOpen(false);
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
          { label: t.about.emailLabel, value: 'your.email@example.com' },
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
      <View style={styles.skillsContainer}>
        {renderSkill('React Native', '90%')}
        {renderSkill('React.js', '85%')}
        {renderSkill('HTML/CSS', '80%')}
        {renderSkill('JavaScript / TypeScript', '80%')}
        {renderSkill('Python', '75%')}
        {renderSkill('Node.js', '70%')}
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
      img: require('./img/icon-SmartWaste Realtime-Analysis.jpg'),
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

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {renderNavbar()}
      {renderMobileMenu()}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {activeTab === 'Home' && renderHome()}
        {activeTab === 'About' && renderAbout()}
        {activeTab === 'Portfolio' && renderPortfolio()}
        {['Blog', 'Contact'].includes(activeTab) && (
          <View style={[styles.section, { alignItems: 'center' }]}>
            <Text style={[styles.title, { color: theme.text }]}>
              {activeTab} Page
            </Text>
            <Text style={{ color: theme.subText }}>Coming soon...</Text>
          </View>
        )}
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
    alignItems: 'center', // 🔴 เพิ่มคำสั่งนี้: จัดให้เส้นสีทอง(ลูก) อยู่กึ่งกลางแนวนอนอัตโนมัติ
  },
  dividerportfolio2: {
    width: 140,
    height: 4,
    borderRadius: 2,
    // ไม่ต้องใส่ marginLeft หรือ padding อะไรเลยครับ ระบบจะจัดกลางให้อัตโนมัติ
  },
});
