document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    const state = {
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
        currentView: 'home'
    };

    // --- DOM Elements ---
    const ageGate = document.getElementById('age-gate');
    const enterBtn = document.getElementById('enter-btn');
    const leaveBtn = document.getElementById('leave-btn');
    const navLinks = document.querySelectorAll('.nav-links a');
    const views = document.querySelectorAll('.view');
    const navbar = document.querySelector('.navbar');
    const toastContainer = document.getElementById('toast-container');
    const videoModal = document.getElementById('video-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    // --- Age Gate Logic ---
    if (!localStorage.getItem('ageVerified')) {
        ageGate.classList.add('active');
    } else {
        ageGate.classList.remove('active');
    }

    enterBtn.addEventListener('click', () => {
        localStorage.setItem('ageVerified', 'true');
        ageGate.classList.remove('active');
    });

    leaveBtn.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
    });

    // --- Navigation Logic ---
    function switchView(viewId) {
        state.currentView = viewId;

        // Update Top Nav
        navLinks.forEach(link => {
            if (link.dataset.page === viewId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update Bottom Nav (Mobile)
        const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
        bottomNavItems.forEach(item => {
            if (item.dataset.page === viewId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update View
        views.forEach(view => {
            if (view.id === `${viewId}-view`) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });

        // Specific View Logic
        if (viewId === 'favorites') renderFavorites();

        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            if (document.getElementById(`${page}-view`)) {
                switchView(page);
            }
        });
    });

    // --- Mobile Bottom Navigation ---
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;

            // Update bottom nav active state
            bottomNavItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');

            // Switch view
            if (document.getElementById(`${page}-view`)) {
                switchView(page);
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Toast Notification ---
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --- Content Rendering ---
    function createVideoCard(video) {
        return `
            <div class="card" onclick="openVideoModal(${video.id})">
                <div class="card-img-wrapper">
                    <img src="${video.thumbnail}" alt="${video.title}" class="card-img">
                    <span class="card-duration">${video.duration}</span>
                </div>
                <div class="card-info">
                    <h3 class="card-title">${video.title}</h3>
                    <div class="card-meta">
                        <span onclick="event.stopPropagation(); openCreatorProfile(${video.creatorId})" style="cursor:pointer; hover:text-decoration:underline;">${video.creator}</span>
                        <span>${video.views} views</span>
                    </div>
                </div>
            </div>
        `;
    }

    function createCategoryCard(category) {
        return `
            <div class="category-card">
                <img src="${category.image}" alt="${category.name}">
                <div class="category-overlay">
                    <span class="category-name">${category.name}</span>
                </div>
            </div>
        `;
    }

    // Render Home Content
    const trendingContainer = document.getElementById('trending-container');
    if (trendingContainer) {
        trendingContainer.innerHTML = videos.filter(v => v.trending).map(createVideoCard).join('');
    }

    const newReleasesContainer = document.getElementById('new-releases-container');
    if (newReleasesContainer) {
        newReleasesContainer.innerHTML = videos.filter(v => v.new).map(createVideoCard).join('');
    }

    const categoriesContainer = document.getElementById('categories-container');
    if (categoriesContainer) {
        categoriesContainer.innerHTML = categories.map(createCategoryCard).join('');
    }

    // --- Creators List Logic ---
    function createCreatorListCard(creator) {
        return `
            <div class="creator-list-card" onclick="openCreatorProfile(${creator.id})">
                <div class="creator-card-info">
                    <img src="${creator.avatar}" alt="${creator.name}" class="creator-card-avatar">
                    <h3 class="creator-card-name">${creator.name}</h3>
                    <span class="creator-card-username">@${creator.username}</span>
                    <div class="creator-card-stats">
                        <span><strong>${creator.subscribers}</strong> Subscribers</span>
                        <span><strong>${creator.views}</strong> Views</span>
                    </div>
                </div>
            </div>
        `;
    }

    const creatorsGrid = document.getElementById('creators-grid');
    if (creatorsGrid) {
        creatorsGrid.innerHTML = creators.map(createCreatorListCard).join('');
    }

    // --- Explore Logic ---
    const exploreGrid = document.getElementById('explore-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderExplore(filter = 'all') {
        let filteredVideos = videos;
        if (filter === 'trending') filteredVideos = videos.filter(v => v.trending);
        if (filter === 'new') filteredVideos = videos.filter(v => v.new);

        exploreGrid.innerHTML = filteredVideos.map(createVideoCard).join('');
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderExplore(btn.dataset.filter);
        });
    });

    if (exploreGrid) renderExplore();

    // --- Creator Profile Logic ---
    window.openCreatorProfile = (creatorId) => {
        const creator = creators.find(c => c.id === creatorId);
        if (!creator) return;

        // Populate Creator View
        document.getElementById('profile-name').textContent = creator.name;
        document.getElementById('profile-username').textContent = `@${creator.username}`;
        document.getElementById('profile-avatar').src = creator.avatar;
        document.querySelector('.creator-cover').style.backgroundImage = `url('${creator.cover || creator.avatar}')`;

        // Populate Stats
        const statsContainer = document.querySelector('.creator-stats');
        statsContainer.innerHTML = `
            <span><strong>${creator.subscribers}</strong> Subscribers</span>
            <span><strong>${creator.views}</strong> Views</span>
        `;

        // Populate Videos
        const creatorVideos = videos.filter(v => v.creatorId === creatorId);
        document.getElementById('creator-videos-grid').innerHTML = creatorVideos.map(createVideoCard).join('');

        // Switch View
        views.forEach(view => view.classList.remove('active'));
        document.getElementById('creator-view').classList.add('active');
        navLinks.forEach(link => link.classList.remove('active')); // Deselect nav items
        window.scrollTo(0, 0);
    };

    // --- Video Modal Logic ---
    window.openVideoModal = (videoId) => {
        const video = videos.find(v => v.id === videoId);
        if (!video) return;

        document.getElementById('modal-title').textContent = video.title;
        document.getElementById('modal-desc').textContent = video.desc || "No description available.";

        // Setup Actions
        const favBtn = document.getElementById('modal-fav');
        const isFav = state.favorites.includes(videoId);
        favBtn.className = isFav ? 'btn-icon active' : 'btn-icon';
        favBtn.onclick = () => toggleFavorite(videoId, favBtn);

        videoModal.classList.add('active');
        videoModal.style.pointerEvents = 'all';
        videoModal.style.opacity = '1';
    };

    closeModalBtn.addEventListener('click', () => {
        videoModal.classList.remove('active');
        videoModal.style.pointerEvents = 'none';
        videoModal.style.opacity = '0';
    });

    // Close on click outside
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModalBtn.click();
        }
    });

    // --- Favorites Logic ---
    function toggleFavorite(videoId, btnElement) {
        const index = state.favorites.indexOf(videoId);
        if (index === -1) {
            state.favorites.push(videoId);
            btnElement.classList.add('active');
            showToast('Added to Favorites');
        } else {
            state.favorites.splice(index, 1);
            btnElement.classList.remove('active');
            showToast('Removed from Favorites', 'error'); // Using error style for removal
        }
        localStorage.setItem('favorites', JSON.stringify(state.favorites));

        // Re-render if in favorites view
        if (state.currentView === 'favorites') renderFavorites();
    }

    function renderFavorites() {
        const favoritesGrid = document.getElementById('favorites-grid');
        if (state.favorites.length === 0) {
            favoritesGrid.innerHTML = '<p class="empty-msg">No favorites yet.</p>';
            return;
        }

        const favVideos = videos.filter(v => state.favorites.includes(v.id));
        favoritesGrid.innerHTML = favVideos.map(createVideoCard).join('');
    }

    // --- Search Logic ---
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length > 0) {
                // Switch to explore view to show results
                if (state.currentView !== 'explore') switchView('explore');

                const filtered = videos.filter(v =>
                    v.title.toLowerCase().includes(query) ||
                    v.creator.toLowerCase().includes(query)
                );
                exploreGrid.innerHTML = filtered.map(createVideoCard).join('');
            } else {
                renderExplore();
            }
        });
    }

    // --- Auth Logic ---
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchAuthLinks = document.querySelectorAll('.switch-auth');
    const btnLogin = document.querySelector('.btn-login');
    const btnSignup = document.querySelector('.btn-signup');
    const userMenu = document.getElementById('user-menu');
    const navUsername = document.getElementById('nav-username');
    const btnLogout = document.getElementById('btn-logout');

    // Check for persisted user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        updateAuthUI(currentUser);
    }

    function updateAuthUI(user) {
        if (user) {
            btnLogin.style.display = 'none';
            btnSignup.style.display = 'none';
            userMenu.style.display = 'flex';
            userMenu.style.alignItems = 'center';
            navUsername.textContent = user.name || user.email.split('@')[0];
        } else {
            btnLogin.style.display = 'inline-block';
            btnSignup.style.display = 'inline-block';
            userMenu.style.display = 'none';
            navUsername.textContent = '';
        }
    }

    function login(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateAuthUI(user);
        showToast(`Welcome back, ${user.name || 'User'}!`, 'success');
        switchView('home');
    }

    function logout() {
        localStorage.removeItem('currentUser');
        updateAuthUI(null);
        showToast('Logged out successfully.', 'success');
        switchView('home');
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            // Simulate Login
            if (email) {
                // In a real app, we'd verify credentials here
                const user = { email: email, name: email.split('@')[0] }; // Mock user object
                login(user);
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            // Simulate Signup
            if (name && email) {
                const user = { name: name, email: email };
                login(user);
            }
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    switchAuthLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            switchView(page);
        });
    });

});
