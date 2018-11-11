package com.degroff.dao.repo;

import org.springframework.data.repository.CrudRepository;

import com.degroff.dao.Question;

public interface QuestionRepository extends CrudRepository<Question, Long>
    {

    }
