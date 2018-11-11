package com.degroff.model;

import com.degroff.dao.Player;

public class GameStatusResponse
    {
    private String msg;
    private Player player;

    public GameStatusResponse( String msg )
        {
        this.setMsg( msg );
        }

    public GameStatusResponse( String msg, Player player )
        {
        super();
        this.msg = msg;
        this.player = player;
        }

    public String getMsg()
        {
        return msg;
        }

    public Player getPlayer()
        {
        return player;
        }

    public void setMsg( String msg )
        {
        this.msg = msg;
        }

    public void setPlayer( Player player )
        {
        this.player = player;
        }

    }
