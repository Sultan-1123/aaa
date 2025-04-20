  // تعريف المتغيرات الأساسية
  const slider = document.getElementById("slider");
  const availableMoviesContainer = document.getElementById("availableMovies");
  const comingSoonMoviesContainer = document.getElementById("comingSoonMovies");
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestions");
  const errorPopup = document.getElementById("errorPopup");
  const errorMessage = document.getElementById("errorMessage");
  const sideMenu = document.getElementById("sideMenu");
  let index = 1;
  let currentGenre = "All";
  let slideInterval;

  const movieData = [
    { 
      src: "/pic/amat.jpeg", 
      genre: "Action", 
      desc: "THE AMATEUR", 
      status: "now",
      description: "A CIA cryptographer seeks revenge after his wife is killed in a devastating terrorist attack. Consumed by grief and a desire for justice, he enlists the help of a skilled fellow agent to train him in combat and field operations. As he dives deeper into the world of espionage and danger, he risks everything to track down those responsible and make them pay.",
      duration: "112 min",
      cast: ["Rami Malek", "Rachel Brosnahan", "Michael Keaton", "Laurence Fishburne"]
    },
    { 
      src: "/pic/bomb.jpeg", 
      genre: "Comedy", 
      desc: "SHABAB AL BOMB 2", 
      status: "now",
      description: "A group of close-knit friends inadvertently stumble upon an old, forgotten bomb in their neighborhood. In their attempt to safely dispose of it, their comedic misadventures spiral out of control, creating chaos wherever they go. As they try to navigate their way through increasingly ridiculous situations, the friends discover unexpected challenges and opportunities for growth.",
      duration: "95 min",
      cast: ["Faisal al-Issa", "Mohannad Al-Jamili", "Abdulaziz Al-Furaihi", "Mohammed Al-Dosari"]
    },
    { 
      src: "/pic/jur.jpeg", 
      genre: "Fantasy", 
      desc: "JURASSIC PET", 
      status: "now",
      description: "A young boy discovers a mysterious egg that hatches into a baby dinosaur. As they bond, they must evade scientists who want to capture the rare creature for experiments.",
      duration: "105 min",
      cast: ["Noah Schnapp", "Brooklynn Prince", "Jack Dylan Grazer", "Alfre Woodard"]
    },
    { 
      src: "/pic/monk.jpeg", 
      genre: "Horror", 
      desc: "THE MONKEY", 
      status: "now",
      description: "Based on Stephen King's short story, this horror film follows siblings who discover an antique toy monkey that brings death whenever it clashes its cymbals.",
      duration: "116 min",
      cast: ["Sophie Thatcher", "Elijah Wood", "Theo James", "Tatiana Maslany"]
    },
    { 
      src: "/pic/moon.jpeg", 
      genre: "Fantasy", 
      desc: "MOON OF PANDA", 
      status: "now",
      description: "An animated adventure following a young panda who embarks on a quest to save the moon after it starts disappearing, threatening his bamboo forest's survival.",
      duration: "98 min",
      cast: ["Noé Liu Martane", "Alexandra Lamy", "Liu Ye", "Sylvia Chang"]
    },
    { 
      src: "/pic/until.jpeg", 
      genre: "Horror", 
      desc: "UNTIL DAWN", 
      status: "now",
      description: "Eight friends trapped on a mountain retreat must survive until dawn while being hunted by a supernatural entity awakened by their presence.",
      duration: "122 min",
      cast: ["Anya Taylor-Joy", "Regé-Jean Page", "Glen Powell", "Sydney Sweeney"]
    },
    { 
      src: "/pic/sinn.jpeg", 
      genre: "Drama", 
      desc: "SINNERS", 
      status: "now",
      description: "A tense psychological thriller about a small town where residents start revealing dark secrets after a mysterious stranger arrives, testing the limits of forgiveness.",
      duration: "134 min",
      cast: ["Jessica Chastain", "Oscar Isaac", "Jeffrey Wright", "Ruth Negga"]
    },
    { 
      src: "/pic/miss.jpeg", 
      genre: "Action", 
      desc: "MISSION IMPOSSIBLE", 
      status: "soon",
      description: "Ethan Hunt and his IMF team race against time to recover stolen advanced AI technology before it falls into the wrong hands and triggers global catastrophe.",
      duration: "145 min",
      cast: ["Tom Cruise", "Rebecca Ferguson", "Simon Pegg", "Vanessa Kirby"]
    },
    { 
      src: "/pic/kid.jpeg", 
      genre: "Action", 
      desc: "KARATE KID:LEGENDS", 
      status: "soon",
      description: "A reboot of the classic franchise follows a young prodigy learning karate from a reluctant master to stand up against bullies and compete in a prestigious tournament.",
      duration: "115 min",
      cast: ["Jackie Chan", "Jaden Smith", "Taraji P. Henson", "Ralph Macchio"]
    },
    { 
      src: "/pic/lost.jpeg", 
      genre: "Drama", 
      desc: "LOST ON A MOUNTAIN IN MAINE", 
      status: "soon",
      description: "Based on a true story, a 12-year-old boy gets separated from his family during a hiking trip and must survive alone in the wilderness for nine days.",
      duration: "108 min",
      cast: ["Jacob Tremblay", "Woody Harrelson", "Laura Dern", "Finn Wolfhard"]
    }
    
];


// تحديث دالة الكاروسل لتتعامل مع عدد مختلف من الصور حسب حجم الشاشة
function updateSlider() {
  const totalMovies = movieData.length;
  if (totalMovies < 3) {
    slider.innerHTML = `<p style="color: white; text-align: center;">Not enough movies to display</p>`;
    return;
  }
  
  // تحديد عدد الأفلام المرئية بناءً على عرض الشاشة
  const screenWidth = window.innerWidth;
  let visibleCount = 5; // الافتراضي للشاشات الكبيرة
  
  if (screenWidth <= 768) {
    visibleCount = 3; // للشاشات المتوسطة والصغيرة
  }

  if (screenWidth <= 1200) {
    visibleCount = 3; // للشاشات المتوسطة والصغيرة
  }
  
  // حساب الفهارس للعناصر المرئية
  const visibleMovies = [];
  const halfVisible = Math.floor(visibleCount / 2);
  
  // إضافة الأفلام المرئية بناءً على العدد المحدد
  for (let i = -halfVisible; i <= halfVisible; i++) {
    const movieIndex = ((index + i + totalMovies) % totalMovies);
    visibleMovies.push(movieIndex);
  }
  
  // إنشاء بطاقات الأفلام مع معلومات إضافية
  slider.innerHTML = visibleMovies.map((movieIndex, position) => {
    const movie = movieData[movieIndex];
    let cardClass = '';
    
    if (position === halfVisible) {
      cardClass = 'center'; // الفيلم المركزي
    } else if (position === halfVisible - 1 || position === halfVisible + 1) {
      cardClass = 'near';   // الأفلام القريبة من المركز
    }
    
    return `
      <div class="movie-card ${cardClass}" onclick="goToMovie('${movie.src}', '${movie.desc}', '${movie.status}')">
        <img src="${movie.src}" alt="${movie.desc}" />
        <div class="movie-info">
          <h4>${movie.desc}</h4>
          <p>${movie.genre}</p>
          <p class="genre">Click for details</p>
        </div>
      </div>
    `;
  }).join('');
  
  // إضافة مؤشرات الموقع إذا لم تكن موجودة
  if (!document.querySelector('.carousel-indicators')) {
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';
    
    for (let i = 0; i < totalMovies; i++) {
      const dot = document.createElement('div');
      dot.className = `indicator ${i === index ? 'active' : ''}`;
      dot.onclick = () => {
        index = i;
        updateSlider();
      };
      indicators.appendChild(dot);
    }
    
    document.querySelector('.carousel').appendChild(indicators);
  } else {
    // تحديث المؤشر النشط
    document.querySelectorAll('.indicator').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
}

// يضاف المستمع التالي إلى التهيئة الرئيسية 
window.addEventListener('resize', () => {
  updateSlider();
});
  // تحسين الانتقال للشريحة التالية - انتقال أكثر سلاسة
  function nextSlide() {
    slider.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    slider.style.transform = "translateX(-15px)";
    slider.style.opacity = "0.8";
    
    setTimeout(() => {
      index = (index + 1) % movieData.length;
      updateSlider();
      
      setTimeout(() => {
        slider.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        slider.style.transform = "translateX(0)";
        slider.style.opacity = "1";
      }, 50);
    }, 250);
  }

  // تحسين الانتقال للشريحة السابقة - انتقال أكثر سلاسة
  function prevSlide() {
    slider.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    slider.style.transform = "translateX(15px)";
    slider.style.opacity = "0.8";
    
    setTimeout(() => {
      index = (index - 1 + movieData.length) % movieData.length;
      updateSlider();
      
      setTimeout(() => {
        slider.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        slider.style.transform = "translateX(0)";
        slider.style.opacity = "1";
      }, 50);
    }, 250);
  }

  function goToMovie(img, title, status) {
    // البحث عن معلومات الفيلم الكاملة
    const movie = movieData.find(m => m.desc === title);
    
    if (!movie) {
      showPopup("Movie information not found!");
      return;
    }
    
    // يتم الانتقال إلى صفحة مختلفة حسب حالة الفيلم
    const url = status === "soon"
      ? `coming-soon.html?img=${encodeURIComponent(img)}&title=${encodeURIComponent(title)}&status=${encodeURIComponent(status)}
        &genre=${encodeURIComponent(movie.genre)}&description=${encodeURIComponent(movie.description || 'No description available')}
        &duration=${encodeURIComponent(movie.duration || '120 min')}&cast=${encodeURIComponent(JSON.stringify(movie.cast || []))}`
      : `movie.html?img=${encodeURIComponent(img)}&title=${encodeURIComponent(title)}&status=${encodeURIComponent(status)}
        &genre=${encodeURIComponent(movie.genre)}&description=${encodeURIComponent(movie.description || 'No description available')}
        &duration=${encodeURIComponent(movie.duration || '120 min')}&cast=${encodeURIComponent(JSON.stringify(movie.cast || []))}`;
    
    // الانتقال مباشرة إلى صفحة الفيلم
    window.location.href = url;
  }

  // تشغيل الكاروسل تلقائيًا
  function setupAutoSlider() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  }

// وظائف البحث واقتراحات البحث
function showSuggestions() {
    const input = searchInput.value.toLowerCase();
    
    // إذا كان حقل البحث فارغًا، إخفاء الاقتراحات
    if (input.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }
    
    // البحث عن الأفلام المطابقة
    const matchingMovies = movieData.filter(movie => 
      movie.desc.toLowerCase().includes(input) || movie.genre.toLowerCase().includes(input)
    );
    
    // إذا وجدت أفلام مطابقة، عرض الاقتراحات
    if (matchingMovies.length > 0) {
      const suggestionsHTML = matchingMovies.slice(0, 5).map(movie => 
        `<p onclick="selectSuggestion('${movie.desc}')">${movie.desc} (${movie.genre})</p>`
      ).join('');
      
      suggestionsBox.innerHTML = suggestionsHTML;
      suggestionsBox.style.display = "block";
    } else {
      suggestionsBox.innerHTML = "<p>No movies found</p>";
      suggestionsBox.style.display = "block";
    }
  }
  
  // اختيار اقتراح من القائمة
  function selectSuggestion(title) {
    searchInput.value = title;
    suggestionsBox.style.display = "none";
    searchMovies(); // البحث مباشرة عند اختيار اقتراح
  }
  
  // معالجة ضغط مفتاح الإدخال في حقل البحث
  function handleEnter(event) {
    if (event.key === "Enter") {
      searchMovies();
    }
  }
  
  // البحث عن الأفلام وتوجيه المستخدم إلى صفحة الحجز
  function searchMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm.trim() === "") {
      showPopup("Please enter a movie title!");
      return;
    }
    
    // البحث عن الفيلم في قاعدة البيانات
    const foundMovie = movieData.find(movie => 
      movie.desc.toLowerCase().includes(searchTerm)
    );
    
    if (foundMovie) {
      // توجيه المستخدم مباشرة إلى صفحة الفيلم / الحجز
      goToMovie(foundMovie.src, foundMovie.desc, foundMovie.status);
    } else {
      showPopup("Movie not found! Please try another title.");
    }
  }
  
  // إظهار نافذة الخطأ
  function showPopup(message) {
    errorMessage.textContent = message;
    errorPopup.style.display = "block";
  }
  
  // إغلاق نافذة الخطأ
  function closePopup() {
    errorPopup.style.display = "none";
  }
  
  // إضافة المستمع للنقر خارج قائمة الاقتراحات لإغلاقها
  document.addEventListener('click', function(event) {
    if (!suggestionsBox.contains(event.target) && event.target !== searchInput) {
      suggestionsBox.style.display = "none";
    }
  });



// تعديل دالة تحديث أقسام الأفلام بدون زر عرض المزيد
function updateMovieSections() {
    // تصفية الأفلام المتاحة حاليًا
    const availableMovies = movieData.filter(movie => 
      movie.status === "now" && (currentGenre === 'All' || movie.genre === currentGenre));
    
    // تصفية الأفلام القادمة قريبًا
    const comingSoonMovies = movieData.filter(movie => 
      movie.status === "soon" && (currentGenre === 'All' || movie.genre === currentGenre));
  
    // عرض الأفلام المتاحة بدون إضافة زر عرض المزيد
    if (availableMovies.length > 0) {
      // إنشاء HTML لعرض الأفلام
      const moviesHTML = availableMovies.map(movie =>
        `<div class="movie-card" onclick="goToMovie('${movie.src}', '${movie.desc}', '${movie.status}')">
          <img src="${movie.src}" alt="${movie.desc}" />
          <div class="movie-info">
            <h4>${movie.desc}</h4>
            <p>${movie.genre}</p>
            <p class="genre">Now Showing</p>
          </div>
        </div>`).join('');
  
      // وضع البطاقات في الحاوية
      availableMoviesContainer.innerHTML = moviesHTML;
      
      // إزالة فئة collapsed للسماح بعرض كامل
      availableMoviesContainer.classList.remove('collapsed');
      
      // إزالة زر عرض المزيد إن وجد
      const showMoreBtn = document.querySelector('#show-more-available');
      if (showMoreBtn) {
        showMoreBtn.remove();
      }
    } else {
      availableMoviesContainer.innerHTML = `<p style="text-align: center; width: 100%; grid-column: span 3;">No movies available in this category</p>`;
    }
  
    // عرض الأفلام القادمة بدون إضافة زر عرض المزيد
    if (comingSoonMovies.length > 0) {
      // إنشاء HTML لعرض الأفلام
      const moviesHTML = comingSoonMovies.map(movie =>
        `<div class="movie-card" onclick="goToMovie('${movie.src}', '${movie.desc}', '${movie.status}')">
          <img src="${movie.src}" alt="${movie.desc}" />
          <div class="movie-info">
            <h4>${movie.desc}</h4>
            <p>${movie.genre}</p>
            <p class="genre">Coming Soon</p>
          </div>
        </div>`).join('');
  
      // وضع البطاقات في الحاوية
      comingSoonMoviesContainer.innerHTML = moviesHTML;
      
      // إزالة فئة collapsed للسماح بعرض كامل
      comingSoonMoviesContainer.classList.remove('collapsed');
      
      // إزالة زر عرض المزيد إن وجد
      const showMoreBtn = document.querySelector('#show-more-coming');
      if (showMoreBtn) {
        showMoreBtn.remove();
      }
    } else {
      comingSoonMoviesContainer.innerHTML = `<p style="text-align: center; width: 100%; grid-column: span 3;">No upcoming movies in this category</p>`;
    }
  }
  
  // إزالة دالة toggleMoviesDisplay لأنها لم تعد مطلوبة
  // function toggleMoviesDisplay(containerId) { ... }
  
  // التهيئة عند تحميل الصفحة - بدون إضافة الفئة collapsed
  window.addEventListener('load', () => {
    updateSlider();
    setupAutoSlider();
    updateMovieSections();
    
    // إزالة فئة collapsed من الحاويات عند بدء التشغيل
    document.getElementById('availableMovies').classList.remove('collapsed');
    document.getElementById('comingSoonMovies').classList.remove('collapsed');
    
    // إيقاف التشغيل التلقائي عند تمرير الماوس فوق العنصر
    document.querySelector('.carousel').addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    // إعادة تشغيل التشغيل التلقائي عند مغادرة الماوس
    document.querySelector('.carousel').addEventListener('mouseleave', () => {
      setupAutoSlider();
    });
    
    // إضافة تأثير تفاعلي إضافي عند التمرير
    window.addEventListener('scroll', () => {
      const movieSections = document.querySelectorAll('.movie-section > div');
      
      movieSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if(isVisible) {
          section.style.opacity = "1";
          section.style.transform = "translateY(0)";
        } else {
          section.style.opacity = "0.7";
          section.style.transform = "translateY(20px)";
        }
      });
    });
    
    // تطبيق التأثيرات الأولية
    document.querySelectorAll('.movie-section > div').forEach(section => {
      section.style.transition = "all 0.5s ease";
    });
  });

  // إضافة هذه الدالة في نهاية ملف index.js

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