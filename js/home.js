$(document).ready(function () {
    $(window).on('load', function () {
        // $(".owl-carousel.banner").owlCarousel({
        //     loop: true,
        //     nav: true,
        //     items: 1,
        //     autoplay: true,
        //     autoplayTimeout: 6500


        // });
        $(".testimonial-wrapper").owlCarousel({
            loop: true,
            nav: false,
            dots: true,
            items: 1,
            // stagePadding: 70,
            margin: 20,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive: {
                0: {
                    items: 1
                },
                557: {
                    items: 2
                },
                767: {
                    items: 3
                },
                991: {
                    items: 4,
                    stagePadding: 70,
                }

            }


        });
    });

    // fading animation on scroll start
    const boxes = gsap.utils.toArray('.fadeUp');
    // Set things up
    gsap.set(boxes, {
        autoAlpha: 0,
        y: 100
    });
    boxes.forEach((box, i) => {
        // Set up your animation
        const anim = gsap.to(box, {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            paused: true
        });

        // Use callbacks to control the state of the animation
        ScrollTrigger.create({
            trigger: box,
            end: "bottom bottom",
            once: true,
            onEnter: self => {
                // If it's scrolled past, set the state
                // If it's scrolled to, play it
                self.progress === 1 ? anim.progress(1) : anim.play()
            }
        });
    });


    gsap.registerPlugin(ScrollTrigger);
    const canvas = document.getElementById("scroll-animation");
    const context = canvas.getContext("2d");
    const frameCount = 105;
    // canvas.width = 1920;
    // canvas.height = 770;
    context.canvas.width = window.innerWidth;
    context.canvas.height = 800;

    const preloadImages = () => {
        for (let i = 1; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            let l = document.createElement('link');
            l.rel = 'preload';
            l.as = 'image';
            l.href = currentFrame(i);
            document.head.appendChild(l);
        }

    };
    const currentFrame = index => (
        `animation/satellite-img/${index.toString().padStart(5, '0')}.jpg`
    );
    const images = [];


    const satelite = {
        frame: 1
    };

    for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);

        images.push(img);
    }



    gsap.to(satelite, {
        frame: frameCount - 2,
        snap: "frame",
        ease: "none",

        scrollTrigger: {
            trigger: canvas,
            scrub: 1,
            pin: false,
            markers: false,
            start: `top ${window.innerHeight}`,
        },
        onUpdate: render
    });

    images[0].onload = render;

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[satelite.frame], 0, 0, `${canvas.width}`, `${canvas.height}`);


    }

    window.onload = function () {
        document.getElementById('banner-video').play();
    };

});