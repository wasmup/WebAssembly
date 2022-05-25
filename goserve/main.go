package main

import (
	"flag"
	"log"
	"net/http"
	"os"
	"regexp"

	"github.com/gorilla/handlers"
)

func main() {
	addr := flag.String("addr", "0.0.0.0:8181", `"IP:Port" or just ":Port" e.g.: ":8181"`)
	flag.Parse()
	// http.HandleFunc("/favicon.ico", favicon)
	http.HandleFunc("/", fileserver)

	log.Println("Open:", *addr)
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

var re = regexp.MustCompile(`.wasm$`)

func fileserver(w http.ResponseWriter, r *http.Request) {
	if re.MatchString(r.RequestURI) {
		w.Header().Set("Content-Type", "application/wasm")
		log.Println(" ****** \n Content-Type: application/wasm \n ******")
	}
	// http.FileServer(http.Dir(".")).ServeHTTP(w, r)
	handlers.CombinedLoggingHandler(os.Stdout, http.FileServer(http.Dir("."))).ServeHTTP(w, r)
}
