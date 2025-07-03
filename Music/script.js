// Music Player JavaScript

class MusicPlayer {
    constructor() {
        this.currentSongIndex = 0;
        this.isPlaying = false;
        this.isShuffled = false;
        this.isRepeating = false;
        this.isMuted = false;
        this.volume = 0.5;
        
        // Sample songs data (you can replace with real audio files)
        this.songs = [
            {
                title: "Timeless",
                artist: "The Weekend",
                duration: "3:45",
                cover: "./pic/clouds.jpeg",
                audio: "./audio/Timeless.mp3" // Sample audio
            },
            {
                title: "GATA only",
                artist: "FloyyMenor Ft. Cris MJ",
                duration: "3:42",
                cover: "./pic/flower.jpeg",
                audio: "./audio/GataOnly.mp3"
            },
            {
                title: "StarBoy",
                artist: "The Weekend",
                duration: "3:47",
                cover: "./pic/light.jpeg",
                audio: "./audio/starboy.mp3"
            },
            {
                title: "Not Like Us",
                artist: "Kendrick Lamar",
                duration: "4:33",
                cover: "./pic/pink.jpeg",
                audio: "./audio/notLikeUs.mp3"
            },
            {
                title: "Dreamers (FIFA World Cup 2022) ",
                artist: "Jungkook ",
                duration: "3:19",
                cover: "./pic/xsisis.jpeg",
                audio: "./audio/Dreamers.mp3"
            }
        ];

        // Initialize player
        this.initializePlayer();
        this.attachEventListeners();
        this.loadCurrentSong();
    }

    initializePlayer() {
        // Get DOM elements
        this.audioPlayer = document.getElementById('audioPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.repeatBtn = document.getElementById('repeatBtn');
        this.favoriteBtn = document.getElementById('favoriteBtn');
        this.menuBtn = document.getElementById('menuBtn');
        
        this.songTitle = document.getElementById('songTitle');
        this.artistName = document.getElementById('artistName');
        this.currentTime = document.getElementById('currentTime');
        this.totalTime = document.getElementById('totalTime');
        this.progress = document.getElementById('progress');
        this.progressBar = document.querySelector('.progress-bar');
        this.progressHandle = document.getElementById('progressHandle');
        this.albumCover = document.getElementById('albumCover');
        this.vinylRecord = document.querySelector('.vinyl-record');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.muteBtn = document.getElementById('muteBtn');


        
        // Set initial volume
        this.audioPlayer.volume = this.volume;
    }

    attachEventListeners() {
        // Play/Pause button
        this.playBtn.addEventListener('click', () => this.togglePlayPause());
        
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());
        
        // Control buttons
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        this.favoriteBtn.addEventListener('click', () => this.toggleFavorite());
        this.menuBtn.addEventListener('click', () => this.showMenu());
        
        // Audio events
        this.audioPlayer.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
        this.audioPlayer.addEventListener('ended', () => this.handleSongEnd());
        this.audioPlayer.addEventListener('canplaythrough', () => this.handleCanPlay());
        
        // Progress bar events
        this.progressBar.addEventListener('click', (e) => this.seekTo(e));
        this.progressHandle.addEventListener('mousedown', (e) => this.startDrag(e));
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Mouse drag events
        document.addEventListener('mousemove', (e) => this.handleDrag(e));
        document.addEventListener('mouseup', () => this.stopDrag());
        this.volumeSlider.addEventListener('input', () => {
            this.changeVolumeSlider(this.volumeSlider.value);
        });
        this.volumeSlider.addEventListener('input', () => {
    this.changeVolumeSlider(this.volumeSlider.value);
});

this.muteBtn.addEventListener('click', () => {
    this.toggleMute();
});

    }

    changeVolumeSlider(value) {
    this.volume = parseFloat(value);
    this.audioPlayer.volume = this.volume;
    this.isMuted = this.volume === 0;
    this.muteBtn.textContent = this.isMuted ? '🔇' : '🔊';
}

toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioPlayer.muted = this.isMuted;
    this.muteBtn.textContent = this.isMuted ? '🔇' : '🔊';
}

    

    loadCurrentSong() {
        const currentSong = this.songs[this.currentSongIndex];
        
        // Update song info
        this.songTitle.textContent = currentSong.title;
        this.artistName.textContent = currentSong.artist;
        this.totalTime.textContent = currentSong.duration;
        
        // Update audio source
        this.audioPlayer.src = currentSong.audio;
        
        // Update album cover (simulate different covers with different gradients)
        this.updateAlbumCover(this.currentSongIndex);
        
        // Reset progress
        this.progress.style.width = '0%';
        this.progressHandle.style.left = '0%';
        this.currentTime.textContent = '0:00';
        
        // Update document title
        document.title = `${currentSong.title} - ${currentSong.artist}`;
    }

   updateAlbumCover(songIndex) {
    const song = this.songs[songIndex];
    this.albumCover.style.backgroundImage = `url('${song.cover}')`;
    this.albumCover.style.backgroundSize = 'cover';
    this.albumCover.style.backgroundPosition = 'center';
    this.albumCover.style.backgroundRepeat = 'no-repeat';
}


    togglePlayPause() {
        if (this.isPlaying) {
            this.pauseSong();
        } else {
            this.playSong();
        }
    }

    playSong() {
        this.audioPlayer.play().then(() => {
            this.isPlaying = true;
            this.playBtn.classList.add('playing');
            this.vinylRecord.classList.add('playing');
            this.vinylRecord.classList.remove('paused');
        }).catch(error => {
            console.log('Error playing audio:', error);
            // Fallback: simulate playing for demo
            this.simulatePlayback();
        });
    }

    pauseSong() {
        this.audioPlayer.pause();
        this.isPlaying = false;
        this.playBtn.classList.remove('playing');
        this.vinylRecord.classList.add('paused');
        this.vinylRecord.classList.remove('playing');
    }

    simulatePlayback() {
        // Fallback method for demo when audio files aren't available
        this.isPlaying = true;
        this.playBtn.classList.add('playing');
        this.vinylRecord.classList.add('playing');
        this.vinylRecord.classList.remove('paused');
        
        // Simulate progress
        this.simulateProgress();
    }

    simulateProgress() {
        if (!this.isPlaying) return;
        
        const duration = this.parseDuration(this.songs[this.currentSongIndex].duration);
        let currentTime = 0;
        
        this.progressInterval = setInterval(() => {
            if (!this.isPlaying) {
                clearInterval(this.progressInterval);
                return;
            }
            
            currentTime += 1;
            const progressPercent = (currentTime / duration) * 100;
            
            this.progress.style.width = `${progressPercent}%`;
            this.progressHandle.style.left = `${progressPercent}%`;
            this.currentTime.textContent = this.formatTime(currentTime);
            
            if (currentTime >= duration) {
                clearInterval(this.progressInterval);
                this.handleSongEnd();
            }
        }, 1000);
    }

    parseDuration(duration) {
        const [minutes, seconds] = duration.split(':').map(Number);
        return minutes * 60 + seconds;
    }

    nextSong() {
        if (this.isShuffled) {
            this.currentSongIndex = Math.floor(Math.random() * this.songs.length);
        } else {
            this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
        }
        
        this.loadCurrentSong();
        
        if (this.isPlaying) {
            this.playSong();
        }
    }

    previousSong() {
        if (this.isShuffled) {
            this.currentSongIndex = Math.floor(Math.random() * this.songs.length);
        } else {
            this.currentSongIndex = this.currentSongIndex === 0 ? 
                this.songs.length - 1 : this.currentSongIndex - 1;
        }
        
        this.loadCurrentSong();
        
        if (this.isPlaying) {
            this.playSong();
        }
    }

    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        this.shuffleBtn.classList.toggle('active', this.isShuffled);
        
        // Show notification
        this.showNotification(this.isShuffled ? 'Shuffle On' : 'Shuffle Off');
    }

    toggleRepeat() {
        this.isRepeating = !this.isRepeating;
        this.repeatBtn.classList.toggle('active', this.isRepeating);
        
        // Show notification
        this.showNotification(this.isRepeating ? 'Repeat On' : 'Repeat Off');
    }

    toggleFavorite() {
        this.favoriteBtn.classList.toggle('active');
        const isFavorite = this.favoriteBtn.classList.contains('active');
        
        // Show notification
        this.showNotification(isFavorite ? 'Added to Favorites' : 'Removed from Favorites');
    }

    showMenu() {
        // Simple menu simulation
        const menuOptions = [
            'Add to Playlist',
            'Share Song',
            'View Album',
            'Artist Info',
            'Settings'
        ];
        
        const selectedOption = menuOptions[Math.floor(Math.random() * menuOptions.length)];
        this.showNotification(`Menu: ${selectedOption}`);
    }

    handleSongEnd() {
        if (this.isRepeating) {
            this.playSong();
        } else {
            this.nextSong();
        }
    }

    handleCanPlay() {
        // Audio is ready to play
        this.updateDuration();
    }

    updateDuration() {
        if (this.audioPlayer.duration) {
            this.totalTime.textContent = this.formatTime(this.audioPlayer.duration);
        }
    }

    updateProgress() {
        if (this.audioPlayer.duration) {
            const progressPercent = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
            this.progress.style.width = `${progressPercent}%`;
            this.progressHandle.style.left = `${progressPercent}%`;
            this.currentTime.textContent = this.formatTime(this.audioPlayer.currentTime);
        }
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    seekTo(e) {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progressPercent = (clickX / rect.width) * 100;
        
        this.progress.style.width = `${progressPercent}%`;
        this.progressHandle.style.left = `${progressPercent}%`;
        
        if (this.audioPlayer.duration) {
            this.audioPlayer.currentTime = (progressPercent / 100) * this.audioPlayer.duration;
        } else {
            // Simulate seek for demo
            const duration = this.parseDuration(this.songs[this.currentSongIndex].duration);
            const newTime = (progressPercent / 100) * duration;
            this.currentTime.textContent = this.formatTime(newTime);
        }
    }

    startDrag(e) {
        this.isDragging = true;
        e.preventDefault();
    }

    handleDrag(e) {
        if (!this.isDragging) return;
        
        const progressBar = this.progressBar;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progressPercent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
        
        this.progress.style.width = `${progressPercent}%`;
        this.progressHandle.style.left = `${progressPercent}%`;
        
        if (this.audioPlayer.duration) {
            this.audioPlayer.currentTime = (progressPercent / 100) * this.audioPlayer.duration;
        }
    }

    stopDrag() {
        this.isDragging = false;
    }

    handleKeyPress(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSong();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSong();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.changeVolume(0.1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.changeVolume(-0.1);
                break;
        }
    }

    changeVolume(delta) {
        this.volume = Math.max(0, Math.min(1, this.volume + delta));
        this.audioPlayer.volume = this.volume;
        
        this.showNotification(`Volume: ${Math.round(this.volume * 100)}%`);
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 14px;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add visual feedback for interactions
    addVisualFeedback() {
        const buttons = document.querySelectorAll('.control-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // Initialize equalizer animation
    initializeEqualizer() {
        const albumCover = document.getElementById('albumCover');
        
        // Create equalizer bars
        const equalizer = document.createElement('div');
        equalizer.className = 'equalizer';
        equalizer.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 3px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        for (let i = 0; i < 5; i++) {
            const bar = document.createElement('div');
            bar.className = 'eq-bar';
            bar.style.cssText = `
                width: 3px;
                height: 20px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 2px;
                animation: equalizer ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate;
                animation-delay: ${i * 0.1}s;
            `;
            equalizer.appendChild(bar);
        }
        
        albumCover.appendChild(equalizer);
        
        // Add equalizer animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes equalizer {
                0% { height: 5px; }
                100% { height: 25px; }
            }
        `;
        document.head.appendChild(style);
        
        // Show equalizer when playing
        this.equalizer = equalizer;
    }

    updateEqualizerVisibility() {
        if (this.equalizer) {
            this.equalizer.style.opacity = this.isPlaying ? '1' : '0';
        }
    }

    // Add touch support for mobile
    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.albumCover.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.albumCover.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeDistance = touchEndX - touchStartX;
            const minSwipeDistance = 50;
            
            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    this.previousSong();
                } else {
                    this.nextSong();
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }

    // Initialize all features
    init() {
        this.addVisualFeedback();
        this.initializeEqualizer();
        this.addTouchSupport();
        
        // Override play/pause to update equalizer
        const originalPlaySong = this.playSong;
        const originalPauseSong = this.pauseSong;
        
        this.playSong = function() {
            originalPlaySong.call(this);
            this.updateEqualizerVisibility();
        };
        
        this.pauseSong = function() {
            originalPauseSong.call(this);
            this.updateEqualizerVisibility();
        };
    }
}

// Initialize the music player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
    player.init();
    
    // Add some extra sparkle animations
    const sparkles = document.querySelectorAll('.sparkle');
    sparkles.forEach((sparkle, index) => {
        sparkle.addEventListener('animationend', () => {
            // Restart animation with random delay
            sparkle.style.animationDelay = `${Math.random() * 2}s`;
        });
    });
    
    // Add loading animation
    const musicContainer = document.querySelector('.music-container');
    musicContainer.style.opacity = '0';
    musicContainer.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        musicContainer.style.transition = 'all 0.8s ease';
        musicContainer.style.opacity = '1';
        musicContainer.style.transform = 'translateY(0)';
    }, 200);
});

// Add some extra visual effects
document.addEventListener('DOMContentLoaded', () => {
    // Create floating particles
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        
        document.querySelector('.bg-elements').appendChild(particle);
        
        // Animate particle
        particle.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 0 },
            { transform: 'translateY(-20px) rotate(180deg)', opacity: 1 },
            { transform: 'translateY(-100vh) rotate(360deg)', opacity: 0 }
        ], {
            duration: 8000 + Math.random() * 4000,
            easing: 'ease-out'
        }).onfinish = () => {
            particle.remove();
        };
    };
    
    // Create particles periodically
    setInterval(createParticle, 2000);
});