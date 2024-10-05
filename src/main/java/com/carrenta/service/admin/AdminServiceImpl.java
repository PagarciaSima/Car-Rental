package com.carrenta.service.admin;

import com.carrenta.dto.CarDto;
import com.carrenta.entity.Car;
import com.carrenta.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private static final Logger logger = LoggerFactory.getLogger(AdminServiceImpl.class);
    private final CarRepository carRepository;

    @Override
    public Car postCar(CarDto carDto) {
        try {
            Car car = getCarFromDto(carDto);
            return carRepository.save(car);

        } catch (IOException e) {
            logger.error("Error processing car data: {}", e.getMessage());
            return null;
        }
    }

    private Car getCarFromDto(CarDto carDto) throws IOException {
        Car car = new Car();
        car.setName(carDto.getName());
        car.setBrand(carDto.getBrand());
        car.setColor(carDto.getColor());
        car.setPrice(carDto.getPrice());
        car.setYear(carDto.getYear());
        car.setType(carDto.getType());
        car.setDescription(carDto.getDescription());
        car.setTransmission(carDto.getTransmission());

        if (carDto.getImage() != null) {
            car.setImage(carDto.getImage().getBytes());
        } else {
            logger.warn("Car image is missing for car: {}", carDto.getName());
            car.setImage(null);
        }
        return car;
    }
}
