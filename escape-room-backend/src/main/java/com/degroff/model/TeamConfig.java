package com.degroff.model;

public class TeamConfig
    {

    private String name;
    private String color;
    private String cred;

    public TeamConfig()
        {
        // TODO Auto-generated constructor stub
        }

    public TeamConfig( String name, String color, String cred )
        {
        this.name = name;
        this.color = color;
        this.cred = cred;
        }

    public String getColor()
        {
        return color;
        }

    public String getCred()
        {
        return cred;
        }

    public String getName()
        {
        return name;
        }

    public void setColor( String color )
        {
        this.color = color;
        }

    public void setCred( String cred )
        {
        this.cred = cred;
        }

    public void setName( String name )
        {
        this.name = name;
        }

    }
