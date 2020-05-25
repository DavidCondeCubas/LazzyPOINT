$(document).ready(function() {
    $('#reset').on('change paste keyup',(function() {
        $('#send').val(this.value);
    }));
});
