module.exports = {
	pwa: {
    themeColor: "#130f40",
    msTileColor: "#130f40",
    name: "Extraordinary-LMS",
    manifestOptions: {
      display: "standalone",
      icons: [
        {
          src: "./img/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "./img/icons/android-chrome-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        }
      ],
    },
  },
}