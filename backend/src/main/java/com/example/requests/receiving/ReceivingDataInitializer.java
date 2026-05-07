package com.example.requests.receiving;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ReceivingDataInitializer implements CommandLineRunner {
    private final ContainerRepository containerRepository;
    private final ClientRepository clientRepository;

    public ReceivingDataInitializer(ContainerRepository containerRepository, ClientRepository clientRepository) {
        this.containerRepository = containerRepository;
        this.clientRepository = clientRepository;
    }

    @Override
    public void run(String... args) {
        seedContainer("MSKU1234567");
        seedContainer("TCLU7654321");
        seedContainer("FESU9876543");
        seedContainer("TEMU4567890");
        seedClient("АО «Смарт Лог»");
        seedClient("ООО «Терминал Север»");
        seedClient("ТОО «Kaz Cargo»");
    }

    private void seedContainer(String number) {
        if (!containerRepository.existsByNumberIgnoreCase(number)) {
            ContainerEntity container = new ContainerEntity();
            container.setNumber(number);
            containerRepository.save(container);
        }
    }

    private void seedClient(String name) {
        if (!clientRepository.existsByNameIgnoreCase(name)) {
            ClientEntity client = new ClientEntity();
            client.setName(name);
            clientRepository.save(client);
        }
    }
}
