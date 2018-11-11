package com.degroff.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity( name = "Team" )
@Table( name = "TEAM" )
public class Team
    {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @Column( name = "id", insertable = true, updatable = true, unique = true, nullable = false )
    private Long id;
    private String name;
    private String color;
    private String cred;

    @OneToMany( cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER )
    private List<Player> players;

    protected Team()
        {
        }

    public Team( String name, String cred )
        {
        super();
        this.name = name;
        this.cred = cred;
        }

    public Team( String name, String cred, String color )
        {
        super();
        this.name = name;
        this.cred = cred;
        this.color = color;
        }

    public void addPlayer( Player newPlayer )
        {
        if ( players == null )
            {
            players = new ArrayList<Player>();
            }
        final Optional<Player> exist = players.stream().filter( p -> p.getId() == newPlayer.getId() ).findFirst();
        if ( !exist.isPresent() )
            {
            players.add( newPlayer );
            }
        }

    public String getColor()
        {
        return color;
        }

    public String getCred()
        {
        return cred;
        }

    public Long getId()
        {
        return id;
        }

    public String getName()
        {
        return name;
        }

    public List<Player> getPlayers()
        {
        return players;
        }

    public void setColor( String color )
        {
        this.color = color;
        }

    public void setCred( String cred )
        {
        this.cred = cred;
        }

    public void setId( Long id )
        {
        this.id = id;
        }

    public void setName( String name )
        {
        this.name = name;
        }

    @Override
    public String toString()
        {
        return String.format( "Team[id=%d, name='%s', cred='%s']", id, name, cred );
        }
    }
