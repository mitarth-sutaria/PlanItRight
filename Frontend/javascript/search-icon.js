document.getElementById('search-icon').addEventListener('click', function() {
    var input = document.getElementById('search-input');
    this.style.display = 'none'; // Hide the search icon
    input.style.display = 'block'; // Show the search input
    input.focus();
});

document.getElementById('search-input').addEventListener('blur', function() {
    this.style.display = 'none'; // Hide the search input
    document.getElementById('search-icon').style.display = 'block'; // Show the search icon
});


