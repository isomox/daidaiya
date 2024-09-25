Page({
  onShareAppMessage() {
    return {
      title: "image",
      path: "packageComponent/pages/media/image/image",
    };
  },
  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || "light",
    });

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme });
      });
    }
    // wx.cloud
    //   .getTempFileURL({
    //     fileList: [
    //       {
    //         fileID:
    //           "cloud://release-b86096.7265-release-b86096-1258211818/开发者社区.webp",
    //         maxAge: 60 * 60,
    //       },
    //     ],
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     this.setData({
    //       webpImageUrl: res.fileList[0].tempFileURL,
    //     });
    //     return res;
    //   })
    //   .catch((error) => {
    //     console.log("CLOUD：image 临时链接获取失败", error);
    //   });

    // i am in wechat miniprogram, i have one thing to do,
    // i have a GET http request, it will response a .jpg image,
    // i want show this image in my miniprogram by the <image> tag,
    // how can i do this?
    wx.request({
      url: "https://0366-240e-469-2e06-9540-e0f0-f2b5-d2d8-8a24.ngrok-free.app/putImage", // Replace with your image URL
      method: "GET",
      responseType: "arraybuffer", // Ensure the response is in binary format
      success: (res) => {
        // Convert the binary data to base64
        const base64 = wx.arrayBufferToBase64(res.data);
        const imageUrl = "data:image/png;base64," + base64;

        // Set the imageUrl in the data object
        this.setData({
          imageUrl: imageUrl,
        });
      },
      fail: (err) => {
        console.error("Failed to fetch image:", err);
      },
    });
  },
  data: {
    theme: "light",
    imageUrl: "",
    webpImageURL: "",
  },
});
