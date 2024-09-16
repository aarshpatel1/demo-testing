function getLuminance(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;

    r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function updateIconColor() {
    const backgroundElement = document.querySelector('.dynamic-background');
    const icon = document.querySelector('.icon');

    // Get background color in RGB format
    const bgColor = window.getComputedStyle(backgroundElement).backgroundColor;

    // Extract RGB values using regex
    const rgb = bgColor.match(/\d+/g).map(Number);

    if (rgb.length === 3) {
        const luminance = getLuminance(rgb[0], rgb[1], rgb[2]);

        // Set icon color based on luminance
        if (luminance > 0.5) {
            icon.style.color = '#000000'; // Darker icon for light backgrounds
        } else {
            icon.style.color = '#ffffff'; // Lighter icon for dark backgrounds
        }
    }
}

// Call the function when the page loads
window.onload = updateIconColor;

// Example to simulate background color change
document.getElementById('change-bg').addEventListener('click', () => {
    const backgroundElement = document.querySelector('.dynamic-background');
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, 
                             ${Math.floor(Math.random() * 256)}, 
                             ${Math.floor(Math.random() * 256)})`;
    backgroundElement.style.backgroundColor = randomColor;

    // Update icon color after background change
    updateIconColor();
});
