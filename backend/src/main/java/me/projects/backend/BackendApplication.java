package me.projects.backend;

import me.projects.backend.entities.Product;
import me.projects.backend.services.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ProductService productService){
        return args -> {
            Product product = new Product();
            product.setName("product 1");
            product.setDescription("product 1 description");
            product.setPrice(1000.0);
            productService.addProduct(product);
        };
    }

}
