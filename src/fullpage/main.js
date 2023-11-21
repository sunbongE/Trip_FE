$(function () {

    $('#fullpage').fullpage({
        //options here
        anchors: ['section1', 'section2', 'section3', 'section4', 'section5'],
        autoScrolling: true,
        scrollHorizontally: true,
        // sectionsColor: ['#ccc', '#bbb', '#ddd', '#eee', '#fff'],
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            console.log("현재 슬라이드 번호는 " + index);
        },
        afterLoad: function (anchorLink, index) {
            console.log("현재 섹션 번호는 " + index);
            if (index == 5) {
                alert("마지막입니다.")
            }
        }
    });
});