    window.Webflow ||= [];
    window.Webflow.push(() => {
        const $marquees = $('[marquee="wrapper"]');
        
        $marquees.each(function () {
            const $marquee = $(this);
            const $marqueeList = $marquee.find('[marquee="list"]');
            const $listParent = $marqueeList.parent();
            const baseDuration = parseFloat($marquee.attr('marquee-duration')) || 60;
            const direction = ($marquee.attr('marquee-direction') || 'left').toLowerCase();
            
            // Determine animation direction
            let fromX, toX;
            if (direction === 'right') {
                fromX = '0%';
                toX = '100%';
            } else {
                // Default to left
                fromX = '0%';
                toX = '-100%';
            }
            
            // Duplicate the marquee list 6 times (original + 5 clones = 6 total)
            for (let i = 0; i < 5; i++) {
                $marqueeList.clone().appendTo($listParent);
            }
            
            // Get all lists
            const $allLists = $marquee.find('[marquee="list"]');
            
            // Create timeline
            const tl = gsap.timeline({ repeat: -1 });
            tl.fromTo(
                $allLists,
                { x: fromX },
                {
                    x: toX,
                    ease: "linear",
                    duration: baseDuration
                }
            );
        });
    });
