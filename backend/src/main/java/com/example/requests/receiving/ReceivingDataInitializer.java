package com.example.requests.receiving;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ReceivingDataInitializer implements CommandLineRunner {
    private final ContainerRepository containerRepository;

    public ReceivingDataInitializer(ContainerRepository containerRepository) {
        this.containerRepository = containerRepository;
    }

    @Override
    public void run(String... args) {
        seed("MSKU1234567");
        seed("TCLU7654321");
        seed("FESU9876543");
        seed("TEMU4567890");
    }

    private void seed(String number) {
        if (!containerRepository.existsByNumberIgnoreCase(number)) {
            ContainerEntity container = new ContainerEntity();
            container.setNumber(number);
            containerRepository.save(container);
        }
    }
}
