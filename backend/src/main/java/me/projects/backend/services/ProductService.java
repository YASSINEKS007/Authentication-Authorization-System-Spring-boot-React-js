package me.projects.backend.services;

import lombok.AllArgsConstructor;
import me.projects.backend.entities.Product;
import me.projects.backend.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class ProductService {
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Product product, Long id) {
        Product oldProduct = productRepository.findById(id).orElse(null);
        oldProduct.setName(product.getName());
        oldProduct.setDescription(product.getDescription());
        oldProduct.setPrice(product.getPrice());
        return productRepository.save(oldProduct);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
