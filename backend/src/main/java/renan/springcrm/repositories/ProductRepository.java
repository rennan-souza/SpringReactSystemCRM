package renan.springcrm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import renan.springcrm.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
