Resources I used for this task:

 - Chart.js (I was actually considering making these from scratch initially)
 - The Bootstrap carousel plugin
 - The clipboard module
 - Regular HTML, CSS and JavaScript
 - ChatGPT (did more harm than good, atleast it helped me with some of the repetetive typing and syntax structure)

Things I would fix if I had the time:

 - So I've made the page partially responsive, but if I resize charts themselves, they go all wonky and start teleporting. So I've restricted their size for now. Also a huge headache to mix it in with that carousel thing

 - There was this copy image thing that I made (and am quite proud of). I'd like to add some sort of feedback so the user knows the image got copied. Right now it's only on the console.

 - On the topic of copying images, I had initially planned to add some sort of 'share image' button so that you could directly open the image on a social media platform. But the API calls I'd have to make for each of those and all the other work I'd have to put into it is out of my depth. Copying an image, on the other hand, gts rid of those problems. Not as tedious as having to download the image, and it looks prettier than those gigantic blob URLs that take up your entire screen. I'd say it's a great alternative for sharing the data.

 - I'll admit that I'm not that great at design. My web page looks like shit, and I don't think I can make it look better even if I tried. So I tried to emphasize functionality over appearance. Though I do want to work on the color schemes a bit (but that scrollbar lookin slick I gotta admit).

 - I wanted to add a feature where users could upload their own data and get it graphed, but that would require a great deal of specification by the user, or a great deal of coding by me, to get the axes and stuff right. So I stuck with NASA's dataset. Coronal mass ejection's pretty cool imo.

 - Initially, I was divided between using different datasets for each chart and using one dataset with every chart. I decided on the latter, because it seemed like getting differentt visualizations of the same data might help people understand it better. Also the api calls to NASA were taking longer than expected. I had to come up with some way of caching the data on my browser, and I knew it'd be more time consuming the more datasets I had to deal with.

 - I wanted to use one of the big frameworks like React or Angular but it's bad enough that I only recently learned regular JS. Besides, drawing a couple graphs and copying them isn't that huge of a deal so it's fine ig.

 - I wanted to split up my tasks directory into this nice big, organized project but given the small scale of the task and my own ineptitude, I settled for cramming all my code into three HTML/CSS/JS files.