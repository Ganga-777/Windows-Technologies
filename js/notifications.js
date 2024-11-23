class NotificationSystem {
    constructor() {
        this.container = document.getElementById('notificationContainer');
    }

    show(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Add icon based on type
        const icon = this.getIcon(type);
        
        notification.innerHTML = `
            ${icon}
            <div class="notification-content">
                <p class="mb-0">${message}</p>
            </div>
        `;

        this.container.appendChild(notification);

        // Remove notification after duration
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s forwards';
            setTimeout(() => {
                this.container.removeChild(notification);
            }, 500);
        }, duration);
    }

    getIcon(type) {
        switch(type) {
            case 'success':
                return '<i class="fas fa-check-circle text-success"></i>';
            case 'error':
                return '<i class="fas fa-exclamation-circle text-danger"></i>';
            default:
                return '<i class="fas fa-info-circle text-primary"></i>';
        }
    }
}

// Loading System
class LoadingSystem {
    constructor() {
        this.overlay = document.getElementById('loadingOverlay');
    }

    show() {
        this.overlay.classList.add('show');
    }

    hide() {
        this.overlay.classList.remove('show');
    }
}

// Initialize systems
const notifications = new NotificationSystem();
const loading = new LoadingSystem();

// Example usage in your existing code:
// notifications.show('Service booked successfully!', 'success');
// notifications.show('Please fill all required fields', 'error');
// loading.show();
// setTimeout(() => loading.hide(), 2000); 