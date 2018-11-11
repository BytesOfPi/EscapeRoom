package com.degroff.dao;

import java.util.List;

public class Game
    {

    private List<Team> teams;
    private List<Question> questions;
    private List<Attempt> attempts;

    public List<Attempt> getAttempts()
        {
        return attempts;
        }

    public List<Question> getQuestions()
        {
        return questions;
        }

    public List<Team> getTeams()
        {
        return teams;
        }

    public void setAttempts( List<Attempt> attempts )
        {
        this.attempts = attempts;
        }

    public void setQuestions( List<Question> questions )
        {
        this.questions = questions;
        }

    public void setTeams( List<Team> teams )
        {
        this.teams = teams;
        }

    }
