package com.carrenta.service.admin;

import com.carrenta.dto.CarDto;
import com.carrenta.entity.Car;
import com.carrenta.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final CarRepository carRepository;

    @Override
    public Car postCar(CarDto carDto, MultipartFile image) throws IOException {
        Car car = new Car();
        car.setBrand(carDto.getBrand());
        car.setColor(carDto.getColor());
        car.setName(carDto.getName());
        car.setType(carDto.getType());
        car.setTransmission(carDto.getTransmission());
        car.setDescription(carDto.getDescription());
        car.setPrice(carDto.getPrice());
        car.setYear(carDto.getYear());

        if (image != null && !image.isEmpty()) {
            car.setImage(image.getBytes());
        }

        return carRepository.save(car);
    }

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll()
                .stream()
                .map(Car::getCarDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    @Override
    public CarDto getCarById(Long id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        return optionalCar.map(Car :: getCarDto).orElse(null);
    }

}
