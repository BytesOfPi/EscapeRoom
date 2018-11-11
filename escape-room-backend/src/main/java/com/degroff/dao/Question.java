package com.degroff.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity( name = "Question" )
@Table( name = "QUESTION" )
public class Question
    {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Column( name = "id", insertable = true, updatable = true, unique = true, nullable = false )
    private Long id;

    @Column( length = 50 )
    private String header;

    @Column( length = 50 )
    private String title;

    @Column( length = 400 )
    private String text;

    @Column( name = "team_submit", length = 400 )
    private String teamSubmit;

    @Column( name = "team_correct", length = 400 )
    private String teamCorrect;

    @Column( name = "team_fail", length = 400 )
    private String teamFail;

    protected Question()
        {
        // TODO Auto-generated constructor stub
        }

    public String getHeader()
        {
        return header;
        }

    public Long getId()
        {
        return id;
        }

    public String getTeamCorrect()
        {
        return teamCorrect;
        }

    public String getTeamFail()
        {
        return teamFail;
        }

    public String getTeamSubmit()
        {
        return teamSubmit;
        }

    public String getText()
        {
        return text;
        }

    public String getTitle()
        {
        return title;
        }

    public void setHeader( String header )
        {
        this.header = header;
        }

    public void setId( Long id )
        {
        this.id = id;
        }

    public void setTeamCorrect( String teamCorrect )
        {
        this.teamCorrect = teamCorrect;
        }

    public void setTeamFail( String teamFail )
        {
        this.teamFail = teamFail;
        }

    public void setTeamSubmit( String teamSubmit )
        {
        this.teamSubmit = teamSubmit;
        }

    public void setText( String text )
        {
        this.text = text;
        }

    public void setTitle( String title )
        {
        this.title = title;
        }

    }
