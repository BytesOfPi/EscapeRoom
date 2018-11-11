package com.degroff.dao.service;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toMap;
import static java.util.stream.StreamSupport.stream;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.degroff.dao.Attempt;
import com.degroff.dao.Game;
import com.degroff.dao.Player;
import com.degroff.dao.Question;
import com.degroff.dao.Team;
import com.degroff.dao.repo.AttemptRepository;
import com.degroff.dao.repo.PlayerRepository;
import com.degroff.dao.repo.QuestionRepository;
import com.degroff.dao.repo.TeamRepository;
import com.degroff.model.GameLoginRequest;
import com.degroff.model.GameStatusResponse;
import com.degroff.model.TeamConfig;
import com.degroff.model.TeamStat;
import com.degroff.model.TeamStatusResponse;

/**
 * The brains behind the Escape Room Game
 */
@ConfigurationProperties( prefix = "game-service" )
@Service
public class GameService
    {

    private List<TeamConfig> teamConfigs;

    /** The msg fail no attempt. */
    private final String MSG_FAIL_NO_ATTEMPT = "No Attempt Found";

    /** The msg fail no team. */
    private final String MSG_FAIL_NO_TEAM = "No Team Found";

    /** The msg fail bad pass. */
    private final String MSG_FAIL_BAD_PASS = "Bad Password";

    /** The msg fail user team. */
    private final String MSG_FAIL_USER_TEAM = "You can't login with that User, try again";

    /** The msg success. */
    private final String MSG_SUCCESS = "Success";

    /** The msg success admin. */
    private final String MSG_SUCCESS_ADMIN = "SuccessAdmin";

    /** The team repo. */
    @Autowired
    private TeamRepository teamRepo;

    /** The player repo. */
    @Autowired
    private PlayerRepository playerRepo;

    /** The question repo. */
    @Autowired
    private QuestionRepository questionRepo;

    /** The attempt repo. */
    @Autowired
    private AttemptRepository attemptRepo;

    @PersistenceContext
    private EntityManager manager;

    /**
     * Team submits an attempt for a particular question
     *
     * @param attempt
     *            the attempt
     * @return the game status response
     */
    public GameStatusResponse addAttempt( Attempt attempt )
        {
        attemptRepo.save( attempt );
        final Question question = questionRepo.findById( attempt.getQuestionId() ).orElse( null );
        updateQuestionTeamStatus( question, Attempt.STATUS_IN_PROGRESS, attempt.getTeamId().toString() );
        return new GameStatusResponse( MSG_SUCCESS );
        }

    /**
     * Adds the player.
     *
     * @param teamName
     *            the team name
     * @param playerName
     *            the player name
     * @return the player
     */
    public Player addPlayer( String teamName, String playerName )
        {
        if ( playerRepo.findByName( playerName ).size() > 0 ) { return null; }

        final Team t = getTeam( teamName );
        // --------------------------------------------------------
        // Add Player to team and update team
        t.addPlayer( new Player( t.getId(), playerName ) );
        updateTeam( t );
        // --------------------------------------------------------
        // Now, get player back
        return playerRepo.findByName( playerName ).stream().findFirst().orElse( null );
        }

    /**
     * Adds the team.
     *
     * @param team
     *            the team
     */
    public void addTeam( Team team )
        {
        teamRepo.save( team );
        }

    /**
     * Attempt login.
     *
     * @param request
     *            the request
     * @return the game status response
     */
    public GameStatusResponse attemptLogin( GameLoginRequest request )
        {
        // --------------------------------------------------------
        // If you are the admin... go to admin page
        if ( request.getPlayer().trim().equalsIgnoreCase( "teach" ) && request.getCreds().trim()
                .equalsIgnoreCase( "super" ) ) { return new GameStatusResponse( MSG_SUCCESS_ADMIN ); }

        // --------------------------------------------------------
        // Retrieve the particular team
        final Team team = getTeam( request.getTeam() );
        // --------------------------------------------------------
        // If team doesn't exist...
        if ( team == null ) { return new GameStatusResponse( MSG_FAIL_NO_TEAM ); }
        // --------------------------------------------------------
        // If team password doesn't match...
        if ( !request.getCreds().trim()
                .equalsIgnoreCase( team.getCred().trim() ) ) { return new GameStatusResponse( MSG_FAIL_BAD_PASS ); }
        // --------------------------------------------------------
        // Add player to team and return successfully
        final Player player = addPlayer( request.getTeam(), request.getPlayer() );
        if ( player == null ) { return new GameStatusResponse( MSG_FAIL_USER_TEAM ); }

        return new GameStatusResponse( MSG_SUCCESS, player );
        }

    @Transactional
    public void deletePlayer( Long playerId )
        {
        // --------------------------------------------------------
        // Delete link between Team and players (if it exists)
        deleteTeamPlayerLink( playerId, 0L );
        // --------------------------------------------------------
        // Delete player
        playerRepo.deleteById( playerId );
        }

    @Transactional
    public void deleteTeamPlayerLink( Long playerId, Long teamId )
        {
        final StringBuilder sb = new StringBuilder( "DELETE FROM TEAM_PLAYERS WHERE " );
        if ( playerId != 0L )
            {
            sb.append( "PLAYERS_ID = " ).append( playerId );
            }
        else
            {
            sb.append( "TEAM_ID = " ).append( teamId );
            }

        // --------------------------------------------------------
        // Delete link between Team and players (if it exists)
        final Query qryDeleteLink = manager.createNativeQuery( sb.toString() );
        qryDeleteLink.executeUpdate();
        }

    /**
     * Gets the all attempts.
     *
     * @return the all attempts
     */
    public List<Attempt> getAllAttempts()
        {
        final Iterable<Attempt> iter = attemptRepo.findAll();
        return stream( iter.spliterator(), false ).collect( toList() );
        }

    /**
     * Gets the all questions.
     *
     * @return the all questions
     */
    public List<Question> getAllQuestions()
        {
        final Iterable<Question> iter = questionRepo.findAll();
        return stream( iter.spliterator(), false ).collect( toList() );
        }

    /**
     * Gets the all successful attempts.
     *
     * @return the all successful attempts
     */
    public List<Attempt> getAllSuccessfulAttempts()
        {
        final Iterable<Attempt> iter = attemptRepo.findByStatus( Attempt.STATUS_SUCCESS );
        return stream( iter.spliterator(), false ).collect( toList() );
        }

    /**
     * Gets the all teams.
     *
     * @return the all teams
     */
    public List<Team> getAllTeams()
        {
        final Iterable<Team> iter = teamRepo.findAll();
        return stream( iter.spliterator(), false ).collect( toList() );
        }

    /**
     * Gets the game status.
     *
     * @return the game status
     */
    public Game getGameStatus()
        {
        final Game g = new Game();
        // --------------------------------------------------------
        // Get all Teams / Questions / Attempts
        g.setTeams( getAllTeams() );
        g.setQuestions( getAllQuestions() );
        g.setAttempts( getAllAttempts() );
        return g;
        }

    public Player getPlayer( Long playerId )
        {
        return playerRepo.findById( playerId ).orElse( null );
        }

    /**
     * Gets the team.
     *
     * @param teamName
     *            the team name
     * @return the team
     */
    public Team getTeam( String teamName )
        {
        return teamRepo.findByName( teamName ).stream().findFirst().orElse( null );
        }

    public Team getTeamById( Long teamId )
        {
        return teamRepo.findById( teamId ).orElse( null );
        }

    public List<TeamConfig> getTeamConfigs()
        {
        return teamConfigs;
        }

    /**
     * Gets the team stats.
     *
     * @return the team stats
     */
    public TeamStatusResponse getTeamStats()
        {
        // --------------------------------------------------------
        // Create a response with the number of questions
        final TeamStatusResponse response = new TeamStatusResponse( questionRepo.count() );

        // --------------------------------------------------------
        // Get all teams
        final Map<String, TeamStat> stats = getAllTeams().stream()
                .collect( toMap( team -> team.getName(), team -> new TeamStat( team, 0 ) ) );

        // --------------------------------------------------------
        // Loop through successful attempts and aggregate team stats
        getAllSuccessfulAttempts().stream().forEach( attempt -> {
        final TeamStat ts = stats.get( attempt.getTeamName() );
        ts.addCorrect();
        ts.addPassQID( attempt.getQuestionId() );
        } );

        // --------------------------------------------------------
        // Set team stats and return response
        response.setTeams( stats.values().stream().collect( toList() ) );
        return response;
        }

    public GameStatusResponse randomLogin( GameLoginRequest request )
        {
        // --------------------------------------------------------
        // If you are the admin... go to admin page
        if ( request.getPlayer().trim()
                .equalsIgnoreCase( "teach" ) ) { return new GameStatusResponse( MSG_SUCCESS_ADMIN ); }

        // --------------------------------------------------------
        // Get smallest team
        final List<Team> teams = getAllTeams();
        final Team smallestTeam = teams.stream().min( Comparator.comparing( team -> team.getPlayers().size() ) )
                .orElse( null );

        // --------------------------------------------------------
        // Add player to team and return successfully
        final Player player = addPlayer( smallestTeam.getName(), request.getPlayer() );
        if ( player == null ) { return new GameStatusResponse( MSG_FAIL_USER_TEAM ); }

        return new GameStatusResponse( MSG_SUCCESS, player );
        }

    public void setTeamConfigs( List<TeamConfig> teamConfigs )
        {
        this.teamConfigs = teamConfigs;
        }

    @Transactional
    public void setTeamNumber( Long numOfTeams )
        {
        final List<Team> existTeams = getAllTeams();
        int num = existTeams.size();
        if ( numOfTeams == num ) return;
        if ( numOfTeams > num )
            {
            // --------------------------------------------------------
            // Add New Teams
            for ( ; numOfTeams > num; num++ )
                {
                final TeamConfig tc = teamConfigs.get( num );
                addTeam( new Team( tc.getName(), tc.getCred(), tc.getColor() ) );
                }
            }
        else
            {
            // --------------------------------------------------------
            // Remove extra teams
            for ( ; numOfTeams < num; num-- )
                {
                final Team team = existTeams.get( num - 1 );
                deleteTeamPlayerLink( 0L, team.getId() );
                teamRepo.delete( team );
                existTeams.remove( team );
                }

            }

        }

    @Transactional
    public void switchPlayer( Long playerId, Long teamId )
        {
        // --------------------------------------------------------
        // Delete link between Team and players (if it exists)
        deleteTeamPlayerLink( playerId, 0L );

        // --------------------------------------------------------
        // Find player/team and add
        final Player player = playerRepo.findById( playerId ).orElse( null );
        final Team team = teamRepo.findById( teamId ).orElse( null );
        player.setTeamId( teamId );
        playerRepo.save( player );
        team.addPlayer( player );
        teamRepo.save( team );
        }

    /**
     * Update attempt status.
     *
     * @param attemptId
     *            the attempt id
     * @param status
     *            the status
     * @return the game status response
     */
    public GameStatusResponse updateAttemptStatus( Long attemptId, String status )
        {
        // --------------------------------------------------------
        // Find the attempt and set status
        final Attempt attempt = attemptRepo.findById( attemptId ).orElse( null );
        if ( attempt == null ) { return new GameStatusResponse( MSG_FAIL_NO_ATTEMPT ); }
        attempt.setStatus( status );
        attemptRepo.save( attempt );
        // --------------------------------------------------------
        // If it was a successful status, add team id to question
        final Question question = questionRepo.findById( attempt.getQuestionId() ).orElse( null );
        if ( question == null ) { return new GameStatusResponse( MSG_SUCCESS ); }

        // --------------------------------------------------------
        // Update the team's status for the particular question
        updateQuestionTeamStatus( question, status, attempt.getTeamId().toString() );

        return new GameStatusResponse( MSG_SUCCESS );
        }

    public void updatePlayer( Player player )
        {
        // --------------------------------------------------------
        // Save the player
        playerRepo.save( player );
        // --------------------------------------------------------
        // Update team with player
        final Optional<Team> team = teamRepo.findById( player.getTeamId() );
        if ( team.isPresent() )
            {
            team.get().addPlayer( player );
            updateTeam( team.get() );
            }
        }

    /**
     * Process question.
     *
     * @param question
     *            the question
     * @param status
     *            the status
     * @param key
     *            the key
     */
    private void updateQuestionTeamStatus( Question question, String status, String id )
        {
        final String key = new StringBuilder( "#" ).append( id ).append( "#" ).toString();
        // --------------------------------------------------------
        // Add team to the question's last status
        if ( status.equals( Attempt.STATUS_SUCCESS ) )
            {
            question.setTeamFail( question.getTeamFail().replaceAll( key, "" ) );
            question.setTeamSubmit( question.getTeamSubmit().replaceAll( key, "" ) );
            question.setTeamCorrect( question.getTeamCorrect() + key );
            }
        else if ( status.equals( Attempt.STATUS_FAIL ) )
            {
            question.setTeamCorrect( question.getTeamCorrect().replaceAll( key, "" ) );
            question.setTeamSubmit( question.getTeamSubmit().replaceAll( key, "" ) );
            question.setTeamFail( question.getTeamFail() + key );
            }
        else if ( status.equals( Attempt.STATUS_IN_PROGRESS ) )
            {
            question.setTeamCorrect( question.getTeamCorrect().replaceAll( key, "" ) );
            question.setTeamFail( question.getTeamFail().replaceAll( key, "" ) );
            question.setTeamSubmit( question.getTeamSubmit() + key );
            }
        // --------------------------------------------------------
        // Update the question
        questionRepo.save( question );
        }

    /**
     * Update team.
     *
     * @param team
     *            the team
     */
    public void updateTeam( Team team )
        {
        teamRepo.save( team );
        }
    }
