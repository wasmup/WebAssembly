package main

import (
	"bytes"
	"io"
	"log"
	"net/http"
)

func favicon(w http.ResponseWriter, r *http.Request) {
	log.Println("favicon served.")
	w.Header().Add("Content Type", "image/ico")
	rdr := bytes.NewReader(favAry[:])
	io.Copy(w, rdr)
}

// http.ServeFile(w, r, "favicon.ico")
// "image/x-icon"  "image/ico"  "text/css" "text/html" "application/javascript"  "image/png"  "image/svg+xml" "text/plain"
// width := 32 // 64 192
// height := width
// upLeft := image.Point{0, 0}
// lowRight := image.Point{width, height}
// img := image.NewRGBA(image.Rectangle{upLeft, lowRight})
// cyan := color.RGBA{0x64, 0xc8, 0xc8, 0xff}
// for x := 0; x < width; x++ {
// 	for y := 0; y < height; y++ {
// 		switch {
// 		case x < width/2 && y < height/2:
// 			img.Set(x, y, cyan)
// 		case x >= width/2 && y >= height/2:
// 			img.Set(x, y, cyan)
// 		}
// 	}
// }
// png.Encode(w, img)

// f, err := os.Open("000.png")
// if err != nil {
// 	panic(err)
// }
// defer f.Close()
// io.Copy(w, f)
