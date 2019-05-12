package com.degroff.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.degroff.dao.Attempt;
import com.degroff.dao.service.GameService;
import com.degroff.model.GameStatusResponse;

@RestController
@RequestMapping( "api/attempt" )
public class AttemptController
    {

    @Autowired
    private GameService svc;

    @PostMapping( value = "/add" )
    public GameStatusResponse addAttempt( @RequestBody Attempt request )
        {
        return svc.addAttempt( request );
        }

    @GetMapping( value = "/update/{attemptId}/{status}" )
    public GameStatusResponse addAttempt( @PathVariable Long attemptId, @PathVariable String status )
        {
        return svc.updateAttemptStatus( attemptId, status );
        }

    @GetMapping( value = "/status" )
    public List<Attempt> getAttemptStatus()
        {
        return svc.getAllAttempts();
        }
    }
