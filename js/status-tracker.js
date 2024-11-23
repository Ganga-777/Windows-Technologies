// Mock service data (replace with actual backend integration)
const mockServiceData = {
    'SRV001': {
        device: 'Laptop - Dell Inspiron',
        service: 'Screen Replacement',
        status: 'repair',
        timeline: {
            received: '2024-02-20',
            diagnosis: '2024-02-21',
            repair: '2024-02-22',
            completed: null
        },
        estimatedCompletion: '2024-02-23'
    }
};

document.getElementById('statusTracker').addEventListener('submit', function(e) {
    e.preventDefault();
    const serviceId = document.getElementById('serviceId').value.trim().toUpperCase();
    
    if (mockServiceData[serviceId]) {
        showServiceStatus(serviceId);
    } else {
        alert('Service ID not found. Please check and try again.');
    }
});

function showServiceStatus(serviceId) {
    const data = mockServiceData[serviceId];
    const statusResult = document.getElementById('statusResult');
    
    // Update status timeline
    updateStatusTimeline(data.status, data.timeline);
    
    // Update service details
    document.getElementById('deviceInfo').textContent = data.device;
    document.getElementById('serviceInfo').textContent = data.service;
    document.getElementById('currentStatus').textContent = capitalizeFirst(data.status);
    document.getElementById('estimatedCompletion').textContent = formatDate(data.estimatedCompletion);
    
    // Show results
    statusResult.style.display = 'block';
}

function updateStatusTimeline(currentStatus, timeline) {
    const statuses = ['received', 'diagnosis', 'repair', 'completed'];
    let reached = true;
    
    statuses.forEach(status => {
        const element = document.getElementById(`${status}Status`);
        if (element) {
            element.classList.remove('active');
            if (timeline[status]) {
                element.classList.add('active');
                document.getElementById(`${status}Date`).textContent = formatDate(timeline[status]);
            } else {
                document.getElementById(`${status}Date`).textContent = '-';
            }
        }
    });
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 