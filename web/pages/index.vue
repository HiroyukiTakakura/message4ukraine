<template>
  <div class="main">
    <h1 class="title">🇺🇦 Create message card for Ukraine 🇺🇦</h1>
    <section class="input">
      <textarea
        class="textarea"
        :class="{ overflow: message.length >= maxLength }"
        placeholder="You can write your message here"
        type="text"
        @keydown="update"
        :maxlength="maxLength"
        v-model="message"
      />
      <div class="count">{{ message.length }} / {{ maxLength }}</div>
    </section>
    <section class="output">
      <canvas
        ref="canvas"
        width="800"
        height="800"
        class="canvas"
        v-if="canvasRendered"
      />
    </section>
    <div class="bottom">
      <a class="button" @click="download">Save Image</a>
      <h2 class="tag">Share with <em>#message4Ukraine</em></h2>
    </div>
    <div class="info">
      <p>
        <a class="info-link" href="https://www.codeninth.com">Author</a>
        <a
          class="info-link"
          href="https://github.com/HiroyukiTakakura/message4ukraine"
          rel="nofollow"
          >GitHub</a
        >
        <a class="info-link" href="https://twitter.com/ongaqJSws">Twitter</a>
      </p>
    </div>
    <aside class="notion">
      This site is collecting user activities with Google Analytics for
      improvement. Naturally, they will never shared with specific country.
    </aside>
  </div>
</template>

<script>
const emoji = {
  a: "🇺🇦",
  b0: "❤️",
  b1: "💙",
  b2: "🌻",
  c0: "🙏",
  c1: "🙏🏻",
  c2: "🙏🏾",
};

export default {
  data() {
    return {
      canvasWidth: 800,
      canvasHeight: 800,
      maxLength: 200,
      message: "",
      awaitingTimer: 0,
      canvasRendered: true,
      dataUri: "",
    };
  },
  head() {
    return {
      title: "🇺🇦 Message for Ukraine",
    };
  },
  methods: {
    update() {
      if (this.$data.awaitingTimer) {
        clearTimeout(this.$data.awaitingTimer);
      }
      this.$data.awaitingTimer = setTimeout(() => {
        this.$data.canvasRendered = false;
        setTimeout(() => {
          this.$data.canvasRendered = true;
        }, 10);
        setTimeout(this.draw, 20);
      }, 500);
    },
    draw() {
      const c = this.$refs.canvas;
      const x = c.getContext("2d");
      const w = this.$data.canvasWidth,
        h = this.$data.canvasHeight;

      x.fillStyle = "#98a4b3";
      x.fillRect(0, 0, w, h / 2);
      x.fill();
      x.fillStyle = "#eae3b5";
      x.fillRect(0, h / 2, w, h);
      x.fill();

      x.fillStyle = "#333";
      x.font = "80px 'Patrick Hand', cursive";
      const emojiPatterns = new Array(10)
        .fill(1)
        .map((_, n) => n)
        .map((rowIndex) =>
          new Array(5)
            .fill(1)
            .map((_, m) => m)
            .map((n) =>
              rowIndex % 2 === 0
                ? `${emoji.a}${
                    n % 2 === rowIndex % 2
                      ? emoji[`b${Math.floor(Math.random() * 3)}`]
                      : emoji[`c${Math.floor(Math.random() * 3)}`]
                  }`
                : `${
                    n % 2 === rowIndex % 2
                      ? emoji[`b${Math.floor(Math.random() * 3)}`]
                      : emoji[`c${Math.floor(Math.random() * 3)}`]
                  }${emoji.a}`
            )
            .reduce((a, v) => a + v, "")
        );
      emojiPatterns.forEach((p, rowIndex) =>
        x.fillText(p, 0, (rowIndex + 1) * 80 - 10)
      );

      x.fillStyle = "#fff";
      x.globalAlpha = 0.87;
      x.fillRect(80, 80, w - 80 * 2, h - 80 * 2);
      x.fill();

      x.fillStyle = "#000";
      x.globalAlpha = 0.64;
      x.font = "52px 'Patrick Hand', cursive";
      x.fillText("message4ukraine.com", 360, h - 30);

      x.globalAlpha = 1;
      if (this.$data.message) {
        x.fillStyle = "#458bd1";
        x.font = "40px 'Patrick Hand', cursive";
        const rows = this.$data.message.split("\n");
        rows.map((row, i) => x.fillText(row, 160, 160 + i * 80));
      }
      this.$data.dataUri = c.toDataURL();
    },
    download() {
      if (!this.$data.dataUri) return;
      const binary = atob(this.$data.dataUri.split(",")[1]);
      const content = new Uint8Array(binary.length);
      for (let i = 0, l = binary.length; l > i; i++) {
        content[i] = binary.charCodeAt(i);
      }
      const mime = "image/png";
      const blob = new Blob([content], { type: mime });
      const name = "message_for_ukraine.png";
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, name);
      } else {
        const a = document.createElement("a");
        a.download = name;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = [mime, a.download, a.href];
        a.click();
      }
    },
  },
  mounted() {
    this.draw();
  },
};
</script>
<style lang="stylus" scoped>
.main
  max-width 640px
  padding 30px 10px 100px
  margin 0 auto
.title
  font-size 30px
  font-weight bold
  font-family 'Patrick Hand', cursive
  text-align center
  color #458bd1
.tag
  font-size 16px
  color #888
  text-align center
  margin-top 20px
  em
    font-weight bold
    font-style normal
    color #458bd1
.textarea
  margin-top 20px
  width 100%
  padding 5px 10px
  color #333
  font-size 16px
  line-height 24px
  height 120px
  appearance none
  border 1px solid #888
  border-radius 3px
  &.overflow
    color red
.count
  color #999
  font-size 13px
  text-align right
.canvas
  width 100%
  background #eee
.output
  margin-top 10px
.button
  display block
  border 1px solid #17a2b8
  background #17a2b8
  border-radius 3px
  color #fff
  text-align center
  vertical-align middle
  text-decoration none
  padding 5px 20px
  transition all 0.2s ease
  cursor pointer
  &:hover
    opacity .7
.bottom
  margin-top 20px
.info
  padding-top 20px
  border-top 1px solid #aaa
  margin-top 30px
.info-link
  display inline-block
  &+&
    margin-left 10px
.notion
  background #f2f2f2
  color #888
  font-size 12px
  text-align center
  padding 5px 10px
  border-radius 3px
</style>
