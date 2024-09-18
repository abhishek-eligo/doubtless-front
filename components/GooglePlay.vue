<script >
export default {
    data() {
        return {
            buttonData: {
                image: '/images/google-play.png'
            }
        }
    }
}
</script>

<template>
    <div>
        <button class="d-flex align-center playButton">
            <img :src="buttonData.image" />
            install app
        </button>
    </div>
</template>
