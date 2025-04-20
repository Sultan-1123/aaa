    // استخراج المعلومات من الرابط
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const img = params.get('img');
    const genre = params.get('genre');
    const description = params.get('description');
    const duration = params.get('duration');
    let cast = [];
    
    // محاولة استخراج قائمة الممثلين كمصفوفة
    try {
      cast = JSON.parse(params.get('cast') || '[]');
    } catch (e) {
      console.error('Error parsing cast data:', e);
    }

    // عرض المعلومات الأساسية
    document.getElementById('movieTitle').innerText = title || 'Movie Title';
    document.getElementById('movieImg').src = img || '/api/placeholder/250/375?text=Movie';
    document.getElementById('movieGenre').innerText = genre || 'Genre not specified';
    document.getElementById('movieDescription').innerText = description || 'No description available.';
    document.getElementById('movieDuration').innerText = duration || '120 min';
    
    // إنشاء قائمة الممثلين
    const castList = document.getElementById('castList');
    if (cast && cast.length > 0) {
      cast.forEach(actor => {
        const listItem = document.createElement('li');
        listItem.className = 'cast-item';
        listItem.innerText = actor;
        castList.appendChild(listItem);
      });
    } else {
      const listItem = document.createElement('li');
      listItem.className = 'cast-item';
      listItem.innerText = 'Cast information not available';
      castList.appendChild(listItem);
    }

    // حفظ المعلومات الضرورية للانتقال إلى صفحة المقاعد
    document.getElementById('hiddenTitle').value = title;
    document.getElementById('hiddenImg').value = img;
    
    // إضافة التأثيرات المرئية عند تحميل الصفحة
    window.addEventListener('load', () => {
      document.querySelectorAll('.cast-item').forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          item.style.transition = 'all 0.3s ease';
          
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        }, index * 100);
      });
    });

// استبدل دالة toggleSideMenu السابقة بهذه النسخة المحسنة

function toggleSideMenu() {
  const sideMenu = document.getElementById("sideMenu");
  const isOpen = sideMenu.classList.toggle("active");
  
  // إدارة طبقة التغطية
  let overlay = document.querySelector('.menu-overlay');
  
  if(isOpen) {
    // إظهار القائمة
    document.body.style.overflow = 'hidden'; // منع التمرير في الصفحة الخلفية
    
    // إنشاء طبقة تغطية إذا لم تكن موجودة
    if(!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'menu-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      overlay.style.zIndex = '998';
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease';
      document.body.appendChild(overlay);
      
      // إضافة حدث النقر لإغلاق القائمة عند النقر خارجها
      overlay.addEventListener('click', () => {
        toggleSideMenu();
      });
    }
    
    overlay.style.display = 'block';
    // تأخير قليلاً لتطبيق التحول البصري
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
    
  } else {
    // إغلاق القائمة
    document.body.style.overflow = ''; // إعادة تفعيل التمرير
    
    // إخفاء طبقة التغطية بتأثير متلاشي
    if(overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300); // مدة التلاشي
    }
  }
}

// إضافة مستمع حدث للإغلاق عند الضغط على زر ESC
document.addEventListener('keydown', (event) => {
  if(event.key === 'Escape') {
    const sideMenu = document.getElementById("sideMenu");
    if(sideMenu.classList.contains("active")) {
      toggleSideMenu();
    }
  }
});

