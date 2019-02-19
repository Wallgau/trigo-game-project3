//créer un array ou object avec valeur
const answersPiList = ["π/6", "π/4", "π/3", "2π/3", "3π/4", "5π/6", "7π/6", "5π/4", "4π/3", "3π/2", "5π/3", "7π/4", "11π/6"];
//when document is ready, on click of the button with a class='fa-play-circle' prevent the default event
const myApp = {};
//on créer une fonction sur myApp pour organiser correctement le code, ici myApp contient ce qui arrive dans myApp.setup
myApp.init = function () {

    myApp.setup();
};
//myApp est utilisé pour prévenir l'evenement par defaut
myApp.setup = function () {

    //ici on appelle les fonctions qui se produisent au click du button start

    myApp.randomTrait();
    /*  myApp.drawShapes(); */

};


myApp.drawShapes = function () {
    /* $('#start').css('display', 'none');
    $('.questions').css('display', 'none');
    //faire apparaitre et disparaitre les line par class au fur et à mesure
    $('.line-red').fadeIn(1000, function () {
        $('.line-red').fadeOut(10000);
        $('.line-blue').fadeIn(10000, function () {
            $('.line-blue').fadeOut(10000);
            $('.line-green').fadeIn(10000, function () {
                $('.line-green').fadeOut('fast')
                $('.trait').fadeIn(10000, function () {
                    $('#start').css('display', 'block');
                    $('.questions').css('display', 'block');
                });
            });
        });
    }); */
};



myApp.randomTrait = function () {

    $('button.play').on('click', function (event) {
        event.preventDefault();
        //je cherche à obtenir un nombre en demandant à js combien d'élément avec la class .trait sil y a (length), ce chiffre me permet ensuite d'utiliser Math.floor(Math.random()) pour avoir un chiffre entier aléatoirement

        $('.trait').css('display', 'none');
        $('.active').removeClass('active');
        const sizeTrait = $('.trait').length;
        const randNumb = Math.floor(Math.random() * sizeTrait) + 1;
        const randTest = $(`.trait:nth-child(${randNumb})`);
        //ajoute attr car jQuery manipule le DOM, our contourner le inline css
        randTest.addClass('active').attr('style', '');
        //Even if I put display:block on my css, I need to add it there because it doesn't listen, comme j'ai déjà un display:none sur cette div avec une autre class.
        myApp.randomValue();
        /*  myApp.randCos(); */
    })


};

//make one Pi value become white, randmoly 
myApp.randomValue = function () {
    myApp.cleanClass();
    //get randomly one of the pi div and add a class od 'active-question'
    const sizeAngleValue = $('.active .pi').length;
    const randNumber = Math.floor(Math.random() * sizeAngleValue) + 1;
    const randPi = $(`.active .pi:nth-of-type(${randNumber})`);
    randPi.addClass('active-question');
    //the pi div with tha class of active question represent the one with the value who is hide by changing color text, so find, add in the ndex of 0 the value of that one ('active-question')
    const answerTrue = $('.active-question').attr('data-answer');

    //put this value randomly inside of one of the 3 buttons the true value, it will always be the index of 0 in the answersList array
    const randNumbButton = $('.answers').length;
    const randButton = Math.floor(Math.random() * randNumbButton) + 1;
    const randBut = $(`.answers:nth-of-type(${randButton})`);
    randBut
        .addClass('linkAnswer')
        .removeClass('answers')
        .removeClass('expectingAnswer')
        .text(`${answerTrue}`);


    const wrongAnswers = answersPiList.filter(function (answer) {
        return answer !== answerTrue
    })

    const randValueBut = $(`.answers`).length;
    const randInput = Math.floor(Math.random() * randValueBut) + 1;
    const wrongAnswersLength = wrongAnswers.length;
    const randValueButton = Math.floor(Math.random() * (wrongAnswersLength));
    const valuenNewArray = wrongAnswers[randValueButton];
    $(`.answers:nth-of-type(${randInput})`)
        .text(`${valuenNewArray}`)
        .removeClass('expectingAnswer')

    //remove the answer form the wrong answer array to prevent duplicate
    const randInputIndex = wrongAnswers.indexOf(valuenNewArray);
    //remove the value
    wrongAnswers.splice(1, randInputIndex);

    const newWrongAnswersLength = wrongAnswers.length;
    let lastRandValueButton = Math.floor(Math.random() * (newWrongAnswersLength));
    $('.expectingAnswer')
        .text(`${wrongAnswers[lastRandValueButton]}`)
        .removeClass('expectingAnswer')

    myApp.feedBack();
}
//to give a feedback about the choice answer provide by the user
myApp.feedBack = function () {
    //I use .off avoid that the function been called again and again...remove the button from previous action
    $('.answers').off().on('click', function (e) {
        e.preventDefault();
        const isAnswered = $('.feedback-user').hasClass('submitted');

        if (isAnswered !== true) {
            $('.feedback-user').addClass('submitted');
            $('.feedback-negatif')
                .css('display', 'block')
                .append(`<i class="far fa-thumbs-down"></i>`);
            $('.feedback-positif').css('display', 'none');
        }
    })

    $('.linkAnswer').off().on('click', function (e) {
        e.preventDefault();
        const isAnswered = $('.feedback-user').hasClass('submitted');
        $('.active-question').css('color', 'inherit');

        if (isAnswered !== true) {
            $('.feedback-user').addClass('submitted');
            $('.feedback-positif')
                .css('display', 'block')
                .append(`<i class="far fa-thumbs-up"></i>`);
            $('.feedback-negatif').css('display', 'none');
        }
    })

}


//make one cos become white randomly
myApp.randCos = function () {
    const sizeCosValue = $('.active .cos').length;
    const randNum = Math.floor(Math.random() * sizeCosValue) + 1;
    const randCos = $(`.active.cos: nth - of - type(${randNum})`);
    randCos.css({ 'color': 'white', 'border': '1px solid black' });
}




myApp.cleanClass = function () {
    $('.feedback-negatif').css('display', 'none');
    $('.feedback-positif').css('display', 'none');
    $('.feedback-user').removeClass('submitted');
    $('.fa-thumbs-up').remove();
    $('.fa-thumbs-down').remove();
    //to avoid to get 2 empty value 
    $('.active-question').removeClass('active-question');
    //to avoid to get mutiple true answer
    $('.linkAnswer').text('').attr('');
    $('.linkAnswer').removeClass('linkAnswer').addClass('answers')
    $('.answers').each(function () {
        $(this).addClass('expectingAnswer').text('');
    });
}
$(document).ready(function () {
    /*  myApp.drawShapes(); */
    myApp.init();
})
