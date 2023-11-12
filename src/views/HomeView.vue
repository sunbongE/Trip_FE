<script setup>
// import { }
</script>
<template>
    <main id="fullpage">
        <section id="sec1" class="section">
            <div id="frame">
                <div id='base'>
                    <div id="textbox">
                        <div>
                            <span>나는 지금 &nbsp</span>
                            <input type='text' name='' id='search' @keyup.enter="submit" autocomplete="off">
                        </div>

                        <div>
                            <span>가고 싶다.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="sec2" class="section">

        </section>
        <section id="sec3" class="section">
        </section>
        <section id="sec4" class="section">
        </section>
        <section id="sec5" class="section">
        </section>
    </main>
</template>
<style scoped>
#sec1 {
    background: no-repeat url("../assets/images/background/section1.jpg");
    background-size: cover;
}

#sec2 {
    background: no-repeat url("../assets/images/background/section2.jpg");
    background-size: cover;

}

#frame {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

input:focus {
    outline: none;
}

#search {
    width: 40%;
    font-size: 60px;
    border-width: 0 0 5px;
    background: transparent;
}



#fp-nav>ul>li>a>span {
    background: #51abf3 !important;
}

#textbox>div>span {
    font-size: 4em;
}

#textbox>div:first-child {
    display: flex;
}

#base {
    display: grid;
    justify-items: center;
    /* grid-template-columns: 3fr 1fr; */
    margin: 0 2em;
}

#textbox>div {
    text-align: end;
}
</style>