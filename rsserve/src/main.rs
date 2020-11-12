use actix_files as fs;
use actix_web::{App, HttpServer};

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    // HttpServer::new(|| App::new().service(fs::Files::new("/", ".").show_files_listing()))
    HttpServer::new(|| App::new().service(fs::Files::new("/", ".").index_file("index.html")))
        .bind("127.0.0.1:8080")?
        .run()
        .await
}
