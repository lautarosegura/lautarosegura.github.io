//AIzaSyCcQeM1pOjId32zqL2zWiPXIwTbAPg1nLs

$(document).ready(function() {
    $('#fare-calculator').submit(function(event) {
        event.preventDefault();
        const distance = parseFloat($('#distance').val());
        const nightTime = $('#night-time').prop('checked');
        const withReturn = $('#return').prop('checked');
        const fare = calculateFare(distance, nightTime, withReturn);
        $('#result').text('Coste estimado: $' + fare.toFixed(2));
    })

    $('.shortcut').click(function(event) {
        event.preventDefault();
        $('.list-group-item').removeClass('active');
        $(this).parent().addClass('active');
        var target = event.target.dataset.target;
        let distance;
        switch(target) {
            case 'lp-ezeiza':
                distance = 84.0;
            break;
            case 'ezeiza-lp':
                distance = 84.9;
            break;
            case 'lp-aeroparque':
                distance = 67.1;
            break;
            case 'aeroparque-lp':
                distance = 65.5;
            break;
        }

        $('#distance').val(distance);
        $('#night-time, #return').prop('checked', false)
    });

    $(document).on('input', '#distance', function() {
        $('.list-group-item').removeClass('active');
        $('#night-time, #return').prop('checked', false)
    })

    $(document).on('input', function() {
        $('#result').text('');
    })

    $('#clear').click(function(event) {
        event.preventDefault();
        $('#distance').val('');
        $('#night-time, #return').prop('checked', false);
        $('.list-group-item').removeClass('active');
    })

});


function calculateFare(distance, nightTime, withReturn) {
    const baseFare = 160;
    const pricePerKilometer = distance > 10 ? 130 : 140;
    const nightTimeSurcharge = 0.15;
    const extraSurcharge = 0.06;
    const shortReturnSurcharge = 1;
    const longReturnSurcharge = 0.3;

    let fare = baseFare + distance * pricePerKilometer;
    if (withReturn) {
        if (distance <= 30 ) {
            fare += fare * shortReturnSurcharge;
        } else if (distance > 30 && distance < 100) {
            fare += fare * longReturnSurcharge;
        }
    }

    if (nightTime) {
        fare += fare * nightTimeSurcharge;
    }

    fare += fare * extraSurcharge;

    return fare;

}
