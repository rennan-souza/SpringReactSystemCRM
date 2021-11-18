package renan.springcrm.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import renan.springcrm.dtos.RoleDTO;
import renan.springcrm.entities.Role;
import renan.springcrm.repositories.RoleRepository;

@Service
public class RoleService {

	@Autowired
	private RoleRepository roleRepository;

	public List<RoleDTO> findAll() {
		List<Role> list = roleRepository.findAll();
		return list.stream().map(x -> new RoleDTO(x)).collect(Collectors.toList());
	}
}
