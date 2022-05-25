all:
	go build -buildvcs=false -ldflags=-s

	go mod tidy
	go get
	go get -u
	go install
	go install -ldflags=-s