import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
  Image, // 1. Import Image เพิ่มเข้ามา
} from 'react-native';

export default function PortfolioWeb() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const theme = {
    bg: isDarkMode ? '#0F172A' : '#FFFFFF',
    navBg: isDarkMode ? '#0F172A' : '#F8FAFC',
    text: isDarkMode ? '#FFFFFF' : '#0F172A',
    subText: isDarkMode ? '#94A3B8' : '#64748B',
    accent: '#38BDF8',
    toggleBtn: isDarkMode ? '#FFFFFF' : '#000000',
    toggleText: isDarkMode ? '#000000' : '#FFFFFF',
  };

  const menuItems = ['Home', 'About', 'Portfolio', 'Blog', 'Contact'];

  const handleMenuPress = (item) => {
    setActiveTab(item);
    setIsMenuOpen(false);
  };

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
        Devis<Text style={{ color: theme.accent }}>.</Text>
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
        {!isMobile && (
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => handleMenuPress(item)}
              >
                <Text
                  style={[
                    styles.menuItem,
                    { color: theme.subText },
                    activeTab === item && {
                      color: theme.accent,
                      fontWeight: 'bold',
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[styles.toggleBtn, { backgroundColor: theme.toggleBtn }]}
          onPress={() => setIsDarkMode(!isDarkMode)}
        >
          <Text style={{ color: theme.toggleText, fontWeight: 'bold' }}>
            {isDarkMode ? 'Light' : 'Dark'}
          </Text>
        </TouchableOpacity>

        {isMobile && (
          <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
            <Text style={{ fontSize: 28, color: theme.text }}>☰</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderMobileMenu = () => (
    <Modal visible={isMenuOpen} animationType="fade" transparent={true}>
      <View style={[styles.fullScreenMenu, { backgroundColor: theme.bg }]}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsMenuOpen(false)}
        >
          <Text style={{ fontSize: 32, color: theme.text }}>✕</Text>
        </TouchableOpacity>

        {menuItems.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => handleMenuPress(item)}
            style={{ marginVertical: 15 }}
          >
            <Text
              style={[
                styles.mobileMenuText,
                { color: theme.subText },
                activeTab === item && {
                  color: theme.accent,
                  fontWeight: 'bold',
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );

  // --- ส่วนหน้า Home ที่อัปเดต (เพิ่มรูปภาพและจัดกลาง) ---
  const renderHome = () => (
    // ปรับสไตล์ section ให้จัดกลาง (alignItems: 'center')
    <View style={[styles.section, { alignItems: 'center' }]}>
      {/* 2. เพิ่ม Image Component ตรงนี้ */}
      <Image
        // ใส่ URL รูปภาพโปรไฟล์ของคุณที่นี่
        source={require('./assets/icon.png')}
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
        HELLO, I'M
      </Text>

      {/* ปรับ Text ให้จัดกลางด้วย (textAlign: 'center') */}
      <Text style={[styles.title, { color: theme.text, textAlign: 'center' }]}>
        Pichet Thimachai
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
        A Creative Full Stack Developer based in Thailand.
      </Text>

      <TouchableOpacity
        style={{ backgroundColor: theme.accent, padding: 15, borderRadius: 8 }}
      >
        <Text style={{ color: '#000', fontWeight: 'bold' }}>Download CV</Text>
      </TouchableOpacity>
    </View>
  );

  // --- ฟังก์ชันสำหรับสร้างหลอดพลัง Skills ---
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

  // --- ส่วนหน้า About ---
  const renderAbout = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>About Me</Text>

      {/* 1. คำอธิบายแนะนำตัว */}
      <Text style={[styles.aboutText, { color: theme.subText }]}>
        I am a passionate Full Stack Developer based in Khon Kaen, Thailand. I
        have a strong interest in building modern, responsive web and mobile
        applications. I love learning new technologies and solving complex
        problems with clean code.
      </Text>

      {/* 2. ข้อมูลส่วนตัว (จัดเรียงเป็น 2 คอลัมน์บนจอคอม, 1 คอลัมน์บนมือถือ) */}
      <View style={styles.infoGrid}>
        {[
          { label: 'Name:', value: 'Pichet Thimachai' },
          { label: 'Email:', value: 'your.email@example.com' },
          { label: 'Location:', value: 'Khon Kaen, Thailand' },
          { label: 'Freelance:', value: 'Available' },
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

      {/* 3. ส่วนทักษะ (Skills) */}
      <Text style={[styles.subTitle, { color: theme.text }]}>My Skills</Text>
      <View style={styles.skillsContainer}>
        {renderSkill('React Native', '90%')}
        {renderSkill('React.js', '85%')}
        {renderSkill('JavaScript / TypeScript', '80%')}
        {renderSkill('Node.js', '75%')}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {renderNavbar()}
      {renderMobileMenu()}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* เปลี่ยนตรงนี้เพื่อให้รองรับหน้า About */}
        {activeTab === 'Home' && renderHome()}
        {activeTab === 'About' && renderAbout()}

        {/* หน้าอื่นๆ ที่ยังไม่ได้ทำ ให้โชว์ชื่อหน้าไปก่อน */}
        {['Portfolio', 'Blog', 'Contact'].includes(activeTab) && (
          <View style={styles.section}>
            <Text style={[styles.title, { color: theme.text }]}>
              {activeTab} Page
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // 1. โครงสร้างหลักของแอปพลิเคชัน
  container: {
    flex: 1, // บังคับให้ใช้พื้นที่ความสูงเต็มหน้าจอ
  },
  scrollContainer: {
    flexGrow: 0.4, // ให้พื้นที่ Scroll ยืดออกไปจนสุดหน้าจอได้
    padding: 20, // เว้นระยะห่างจากขอบจอ 20px
    alignItems: 'center', // จัดเนื้อหาทั้งหมดให้อยู่กึ่งกลางหน้าจอแนวนอน
    justifyContent: 'center', // จัดเนื้อหาให้อยู่กึ่งกลางแนวตั้ง (กรณีเนื้อหาน้อยกว่าจอ)
  },
  section: {
    width: '100%',
    maxWidth: 800, // จำกัดความกว้างสูงสุดไว้ที่ 800px เพื่อไม่ให้หน้าเว็บกว้างเกินไปบนจอคอม
    alignItems: 'flex-start', // จัดให้เนื้อหาใน Section ชิดซ้ายเป็นค่าเริ่มต้น
  },

  // 2. แถบนำทางด้านบน (Navbar)
  navbar: {
    flexDirection: 'row', // จัดเรียงโลโก้และเมนูเป็นแนวนอน
    justifyContent: 'space-between', // ดันโลโก้ไปซ้ายสุด ดันเมนูไปขวาสุด
    alignItems: 'center', // จัดให้อยู่กึ่งกลางแนวตั้งของแถบ Navbar
    paddingHorizontal: 20, // เว้นระยะขอบซ้าย-ขวา
    paddingVertical: 20, // เว้นระยะขอบบน-ล่างให้ Navbar ดูหนาขึ้น
    borderBottomWidth: 1, // เส้นขอบบางๆ ด้านล่าง Navbar
    zIndex: 10, // ทำให้ Navbar ลอยอยู่เหนือเนื้อหาอื่นๆ เสมอ
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold', // ตัวหนาสำหรับโลโก้
  },
  menuContainer: {
    flexDirection: 'row', // จัดเรียงเมนูแต่ละหน้าเป็นแนวนอน
    gap: 20, // เว้นระยะห่างระหว่างเมนู 20px
    marginRight: 10, // เว้นระยะห่างจากปุ่มสลับธีม
  },
  menuItem: {
    fontSize: 16,
    marginHorizontal: 10, // เว้นระยะซ้ายขวาของข้อความเมนู
  },
  toggleBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20, // ทำปุ่มสลับธีม (Dark/Light) ให้มีความโค้งมนแบบแคปซูล
    marginLeft: 10,
  },

  // 3. รูปภาพโปรไฟล์ (หน้า Home)
  profileImage: {
    width: 150, // ความกว้างรูป (หากอยากให้ใหญ่ขึ้น ให้ปรับตัวนี้)
    height: 150, // ความสูงรูป (ควรปรับให้เท่ากับความกว้าง)
    borderRadius: 75, // ทำเป็นรูปวงกลม (ต้องเป็น "ครึ่งหนึ่ง" ของ width/height เสมอ)
    borderWidth: 3, // ความหนาของเส้นขอบรอบรูป
    marginBottom: 10, // ระยะห่างด้านล่างระหว่างรูปกับข้อความ
  },
  title: {
    fontSize: 40,
    fontWeight: '900', // ตัวหนามากสำหรับชื่อของคุณในหน้า Home
    marginBottom: 10,
  },

  // 4. เมนู Pop-up (สำหรับหน้าจอมือถือ)
  fullScreenMenu: {
    flex: 1,
    justifyContent: 'center', // จัดเมนูให้อยู่กลางจอมือถือแนวตั้ง
    alignItems: 'center', // จัดเมนูให้อยู่กลางจอมือถือแนวนอน
  },
  closeButton: {
    position: 'absolute', // ทำให้ปุ่มกากบาทลอยอิสระ
    top: 20, // ชิดด้านบน
    right: 25, // ชิดขวา
    padding: 10,
  },
  mobileMenuText: {
    fontSize: 28, // ขนาดตัวอักษรเมนูบนมือถือ (ใหญ่กว่าปกติเพื่อให้กดง่าย)
  },

  // 5. สไตล์สำหรับหน้า About Me
  sectionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20, // ระยะห่างด้านล่างของหัวข้อ About Me
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30, // ดันหัวข้อ My Skills ให้ห่างจากข้อมูลด้านบน
    marginBottom: 15,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 28, // ความห่างระหว่างบรรทัดให้อ่านง่ายขึ้น
    marginBottom: 30,
  },

  // --- ส่วนข้อมูลส่วนตัว (Name, Email, Location) ---
  infoGrid: {
    flexDirection: 'row', // เรียงข้อมูลจากซ้ายไปขวา
    flexWrap: 'wrap', // ถ้าพื้นที่หน้าจอไม่พอ ให้ปัดข้อมูลลงไปบรรทัดใหม่
    justifyContent: 'space-between',
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row', // เรียง หัวข้อ(Label) กับ ค่า(Value) ให้อยู่บรรทัดเดียวกัน
    marginBottom: 15, // ระยะห่างของแต่ละบรรทัด
  },
  infoLabel: {
    fontWeight: 'bold',
    width: 90, // ล็อกความกว้างของหัวข้อ (เช่น Name:, Email:) ให้ตรงกันเป็นระเบียบ
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    flex: 1, // ปล่อยให้ข้อความ (เช่น ชื่อของคุณ) ใช้พื้นที่ที่เหลือไปจนสุด
  },

  // --- ส่วนหลอดพลังทักษะ (Skills Progress Bar) ---
  skillsContainer: {
    width: '100%', // ให้กล่องทักษะกว้างเต็ม Section
  },
  skillItem: {
    marginBottom: 20, // ระยะห่างระหว่างทักษะแต่ละอัน
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // แยกชื่อทักษะไว้ซ้าย ดันเปอร์เซ็นต์ไปขวาสุด
    marginBottom: 8, // ระยะห่างระหว่างชื่อทักษะกับตัวหลอดพลัง
  },
  progressBarBg: {
    width: '100%',
    height: 8, // ความหนาของหลอดพลัง
    borderRadius: 4, // ความโค้งมนของหลอดพลัง
    overflow: 'hidden', // กันไม่ให้สีที่เติม (Fill) ล้นออกนอกกรอบ
  },
  progressBarFill: {
    height: '100%', // เติมสีให้เต็มความสูงของหลอด (8px)
    borderRadius: 4,
  },
});
