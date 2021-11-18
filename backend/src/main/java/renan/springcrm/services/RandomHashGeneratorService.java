package renan.springcrm.services;

import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class RandomHashGeneratorService {

	private Random rand = new Random();

	public String newHash(int size) {
		char[] vet = new char[size];
		for (int i = 0; i < size; i++) {
			vet[i] = randomChar();
		}
		return new String(vet);
	}

	private char randomChar() {
		int opt = rand.nextInt(3);
		if (opt == 0) { // gera número
			return (char) (rand.nextInt(10) + 48);
		} else if (opt == 1) { // gera letra maiúscula
			return (char) (rand.nextInt(26) + 65);
		} else { // gera letra minúscula
			return (char) (rand.nextInt(26) + 97);
		}
	}
}
