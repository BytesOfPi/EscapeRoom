package com.degroff.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.degroff.dao.Game;
import com.degroff.dao.Question;
import com.degroff.dao.service.GameService;
import com.degroff.model.GameLoginRequest;
import com.degroff.model.GameStatusResponse;

@RestController
@RequestMapping( "game" )
public class GameController
    {

    @Autowired
    private GameService svc;

    @GetMapping( value = "/questions" )
    public List<Question> getQuestions()
        {
        return svc.getAllQuestions();
        }

    @GetMapping( value = "/status" )
    public Game getStatus()
        {
        return svc.getGameStatus();
        }

    @PostMapping( value = "/login" )
    public GameStatusResponse login( @RequestBody GameLoginRequest request )
        {
        return svc.attemptLogin( request );
        }

    @PostMapping( value = "/loginRandom" )
    public GameStatusResponse loginRandom( @RequestBody GameLoginRequest request )
        {
        return svc.randomLogin( request );
        }
    }
