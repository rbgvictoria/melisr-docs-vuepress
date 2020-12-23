# Specify IPT integration

After setting up the Schema Mapper and running the Data Exporter (see 
[Specify to Darwin Core mapping](../specify-dwc-mapping)), I found out 
that the command line tool to update the exported data, ExpCmdLine, 
requires a graphics card, which makes that I cannot run it from the server and 
use it to schedule updates. Therefore, inspired by Andy's presentation of the 
DwCA tool in Specify 7, I decided to try and write an SQL query that I could use 
directly in the IPT. This worked after a bit of trial and error.

This is the rather impressive-looking (if I may say so myself) query I came up 
with.

```sql
select co.CollectionObjectID as id, co.GUID as occurrenceID,
  -- record level terms
  'PhysicalObject' as "type",
  co.TimestampModified as modified,
  'https://creativecommons.org/licenses/by/4.0/legalcode' AS license,
  'Royal Botanic Gardens Board' AS rightsHolder,
  'MEL' as institutionCode,
  'MEL' as collectionCode,
  'PreservedSpecimen' as basisOfRecord,
  
  -- Occurrence
  concat('MEL ', co.CatalogNumber) as catalogNumber,
  ce.VerbatimLocality as occurrenceRemarks,
  ce.StationFieldNumber as recordNumber,
  collectorstring(ce.CollectingEventID, '|', true) as recordedBy,
  recorded_by_id(ce.CollectingEventID) as recordedByID,
  dwc_reproductive_condition(co.CollectionObjectID) as reproductiveCondition,
  dwc_establishment_means(co.CollectionObjectID) as establishmentMeans,
  'present' as occurrenceStatus,
  preparations(co.CollectionObjectID) as preparations,
  associated_sequences(co.CollectionObjectID) as associatedSequences,
  -- associatedTaxa,
  
  -- Organism
  previous_identifications(co.CollectionObjectID) previousIdentifications,
  
  -- Event
  ce.GUID as eventID,
  ctr.CollectingTripName as parentEventID,
  concat_ws('/', dateWithPrecision(ce.StartDate, ce.StartDatePrecision), dateWithPrecision(ce.EndDate, ce.EndDatePrecision)) as eventDate,
  if(ce.EndDate is null and ce.StartDatePrecision=1, dayofyear(ce.StartDate), null) as startDayOfYear,
  if(ce.EndDate is null, year(ce.StartDate), null) as "year",
  if(ce.EndDate is null and ce.StartDatePrecision in (1, 2), month(ce.StartDate), null) as "month",
  if(ce.EndDate is null and ce.StartDatePrecision=1, day(ce.StartDate), null) as "day",
  ce.VerbatimDate as verbatimEventDate,
  ce.Remarks as habitat,
  
  -- Location
  l.GUID as locationID,
  hg.higherGeography,
  ld.WaterBody as waterBody,
  ld.IslandGroup as islandGroup,
  ld.Island as island,
  hg.continent,
  hg.Country as country,
  g.Text1 as countryCode,
  hg.State as stateProvince,
  hg.County as county,
  l.LocalityName as verbatimLocality,
  l.LocalityName as locality,
  CASE 
  WHEN l.VerbatimElevation IS NOT NULL THEN l.VerbatimElevation
  ELSE
    CASE l.Text1
    WHEN 'ft' THEN CASE WHEN l.MaxElevation IS NULL THEN CONCAT_WS(' ', l.MinElevation, l.Text1) ELSE CONCAT(l.MinElevation, '–', l.MaxElevation, ' ', l.Text1) END
    ELSE NULL
    END
  END as verbatimElevation,
  CASE l.Text1 WHEN 'ft' THEN round(l.MinElevation * 0.3048) ELSE l.MinElevation END as minimumElevationInMeters,
  CASE 
  WHEN l.MaxElevation Is Null THEN
    CASE l.Text1 WHEN 'ft' THEN round(l.MinElevation * 0.3048) ELSE l.MinElevation END
  ELSE 
    CASE l.Text1 WHEN 'ft' THEN round(l.MaxElevation * 0.3048) ELSE l.MaxElevation END
  END as maximumElevationInMeters,
  CASE 
  WHEN EndDepth IS NULL THEN
    CASE StartDepthUnit
    WHEN '2' THEN CONCAT(StartDepth, ' ft')
    WHEN '3' THEN CONCAT(StartDepth, ' fathoms')
    ELSE NULL
    END
  ELSE
    CASE StartDepthUnit
    WHEN '2' THEN CONCAT(StartDepth, '–', EndDepth, ' ft')
    WHEN '3' THEN CONCAT(StartDepth, '–', ENDDepth, ' fathoms')
    ELSE NULL
    END
  END as verbatimDepth,
  CASE StartDepthUnit WHEN '1' THEN StartDepth WHEN '2' THEN ROUND(StartDepth * 0.3048) WHEN '3' THEN ROUND(StartDepth * 1.8288) END as minimumDepthInMeters,
  CASE 
  WHEN EndDepth IS NULL THEN
    CASE StartDepthUnit WHEN '1' THEN StartDepth WHEN '2' THEN ROUND(StartDepth * 0.3048) WHEN '3' THEN ROUND(StartDepth * 1.8288) END
  ELSE
    CASE StartDepthUnit WHEN '1' THEN EndDepth WHEN '2' THEN ROUND(EndDepth * 0.3048) WHEN '3' THEN ROUND(EndDepth * 1.8288) END
  END as maximumDepthInMeters,
  if(l.Latitude1 is not null and l.Longitude1 is not null, l.Lat1Text, null) as verbatimLatitude,
  if(l.Latitude1 is not null and l.Longitude1 is not null, l.Long1Text, null) as verbatimLongitude,
  gc.OriginalCoordSystem as verbatimCoordinateSystem,
  srs_from_datum(l.Datum) as verbatimSRS,
  l.Latitude1 as decimalLatitude,
  l.Longitude1 as decimalLongitude,
  srs_from_datum(l.Datum) as geodeticDatum,
  coalesce(ROUND(gc.GeoRefAccuracy), ROUND(gc.MaxUncertaintyEst), coordinate_uncertainty_in_meters(l.OriginalElevationUnit)) as coordinateUncertaintyInMeters,
  gc.NamedPlaceExtent as coordinatePrecision,
  concat_ws(', ', gca.LastName, gca.FirstName) as georeferencedBy,
  gc.GeoRefDetDate as georeferencedDate,
  l.LatLongMethod as georeferenceProtocol,
  gc.Text1 as georeferenceSources,
  replace(gc.GeoRefVerificationStatus, 'Corrected', 'Verified') as georeferenceVerificationStatus,
  gc.GeoRefRemarks as georeferenceRemarks,
  
  -- Identification
  d.GUID as identificationID,
  concat_ws(', ', da.LastName, da.FirstName) as identifiedBy,
  identified_by_id(d.DeterminationID) as identifiedByID,
  dateWithPrecision(d.DeterminedDate, d.DeterminedDatePrecision) as dateIdentified,
  d.Remarks as identificationRemarks,
  dwc_identification_qualifier(d.Qualifier, d.VarQualifier, t.TaxonID) as identificationQualifier,
  dwc_type_status(co.CollectionObjectID) as typeStatus,
    
  -- Taxon
  if(t.FullName LIKE '% [%' , substring(t.FullName, 1, LOCATE(' [', t.FullName)-1), t.FullName) as scientificName,
  t.Author as scientificNameAuthorship,
  hc.higherTaxonomy as higherClassification,
  hc.kingdom,
  hc.phylum,
  hc.`class`,
  hc.`order`,
  hc.family,
  hc.genus,
  hc.specificEpithet,
  hc.infraspecificEpithet,
  hc.taxonRank,
  t.Remarks as taxonRemarks,
  'ICN' as nomenclaturalCode,
  t.EsaStatus as nomenclaturalStatus

from collectionobject co
join collectingevent ce on co.CollectingEventID=ce.CollectingEventID
left join collectingtrip ctr ON ce.CollectingTripID=ctr.CollectingTripID
join locality l on ce.LocalityID=l.LocalityID
left join geography g on l.GeographyID=g.GeographyID
left join aux_highergeography_test hg on g.GeographyID=hg.GeographyID
left join localitydetail ld on l.LocalityID=ld.LocalityID
left join geocoorddetail gc on l.LocalityID=gc.LocalityID
left join agent gca on gc.AgentID=gca.AgentID
left join determination d on co.CollectionObjectID=d.CollectionObjectID and d.IsCurrent=true
left join agent da on d.DeterminerID=da.AgentID
left join taxon t on d.TaxonID=t.TaxonID
left join aux_highertaxonomy_test hc on t.TaxonID=hc.TaxonID
where co.CollectionID=4
```

This query uses all the functions described in 
[Specify to Darwin Core mapping](../specify-dwc-mapping), but there is no need 
anymore to store the returned values in the database. The only extra thing that 
is needed are tables to cache the higher classification and higher geography, 
which I had already in place for use with the BioCASe provider. Without those 
tables the query would run very slow indeed and most likely time out.

As it is now, the IPT takes just over 20 minutes to publish our entire data set 
of almost a million records. The Darwin Core Archive creation 
tool in Specify 7 is almost twice as quick, but we cannot use the archives that 
are produced with Specify 7, as our data is stored in a different way than we 
want to export/publish it in and we also have extensions with external data (for 
images for example).

## Extra functions

These extra functions were written to do what is done by formatters and 
aggregators in Specify.

### collectorstring()

```sql
-- collector_string
DROP function IF EXISTS `collectorstring`;

DELIMITER $$
USE `melisr`$$
CREATE FUNCTION `collectorstring`(p_collectingeventid int, p_separator varchar(4), p_primary bit) RETURNS varchar(256) CHARSET utf8
    READS SQL DATA
BEGIN
  DECLARE out_collector_string varchar(256);
  IF p_primary=true THEN
    SELECT REPLACE(GROUP_CONCAT(IF(!isnull(a.FirstName), CONCAT(a.LastName, ', ', a.FirstName), a.LastName) ORDER BY c.OrderNumber SEPARATOR 'placeholder-sep'), 'placeholder-sep', p_separator)
    INTO out_collector_string
    FROM collector c
    JOIN agent a ON c.AgentID=a.AgentID
    WHERE c.CollectingEventID=p_collectingeventid AND c.IsPrimary=p_primary
    GROUP BY c.CollectingEventID;
  ELSE
    SELECT REPLACE(GROUP_CONCAT(IF(!isnull(a.FirstName), CONCAT(a.LastName, ', ', a.FirstName), a.LastName) ORDER BY c.OrderNumber SEPARATOR 'placeholder-sep'), 'placeholder-sep', p_separator)
    INTO out_collector_string
    FROM collector c
    JOIN agent a ON c.AgentID=a.AgentID
    WHERE c.CollectingEventID=p_collectingeventid
    GROUP BY c.CollectingEventID;
  END IF;

  RETURN out_collector_string;
END$$

DELIMITER ;
```

### recorded_by_id()

```sql
-- recorded_by_id
DROP function IF EXISTS `recorded_by_id`;

DELIMITER $$
USE `melisr`$$
CREATE FUNCTION `recorded_by_id`(in_collecting_event_id int) RETURNS varchar(256) CHARSET utf8
BEGIN
	DECLARE out_recorded_by_id varchar(256);
    SELECT GROUP_CONCAT(DISTINCT COALESCE(av1.Name, av2.Name) ORDER BY c.OrderNumber SEPARATOR ' | ')
    INTO out_recorded_by_id
    FROM collector c
    JOIN agent a ON c.AgentID=a.agentID
    LEFT JOIN agentvariant av1 ON a.AgentID=av1.AgentID AND av1.VarType=11
    LEFT JOIN agentvariant av2 ON a.AgentID=av2.AgentID AND av2.VarType=9
    WHERE c.CollectingEventID=in_collecting_event_id AND (av1.AgentVariantID IS NOT NULL OR av2.AgentVariantID IS NOT NULL)
    GROUP BY c.CollectingEventID;
RETURN out_recorded_by_id;
END$$

DELIMITER ;
```

### preparations()

```sql
-- preparations
DROP function IF EXISTS `preparations`;

DELIMITER $$
USE `melisr`$$
CREATE FUNCTION `preparations`(in_collection_object_id INTEGER) RETURNS varchar(256) CHARSET utf8
BEGIN
	DECLARE out_preparations VARCHAR(256);
	SELECT GROUP_CONCAT(DISTINCT pt.Name ORDER BY pt.PrepTypeID SEPARATOR ' | ')
    INTO out_preparations
	FROM preparation p
	JOIN preptype pt ON p.PrepTypeID=pt.PrepTypeID
	WHERE p.CollectionObjectID=in_collection_object_id AND pt.PrepTypeID NOT IN (13, 15, 16, 17, 18, 24)
	GROUP BY p.CollectionObjectID;
RETURN out_preparations;
END$$

DELIMITER ;
```

### associated_sequences()

```sql
-- associated_sequences
DROP function IF EXISTS `associated_sequences`;

DELIMITER $$
USE `melisr`$$
CREATE FUNCTION `associated_sequences`(in_collection_object_id int) RETURNS varchar(256) CHARSET utf8
BEGIN
	DECLARE out_associated_sequences varchar(256);
    SELECT group_concat(concat('https://www.ncbi.nlm.nih.gov/nuccore/', GenBankAccessionNumber) SEPARATOR ' | ')
    INTO out_associated_sequences
    FROM dnasequence
    WHERE CollectionObjectID=in_collection_object_id
    GROUP BY CollectionObjectID;
RETURN out_associated_sequences;
END$$

DELIMITER ;
```

### previous_identifications()

```sql
-- previous_identifications
DROP function IF EXISTS `previous_identifications`;

DELIMITER $$
USE `melisr`$$
CREATE FUNCTION `previous_identifications`(in_collection_object_id INTEGER) RETURNS text CHARSET utf8
BEGIN
	DECLARE out_previous_identifications TEXT;
	select 
	  group_concat(identification_string(concat_ws(', ', concat_ws(' ', if(t.FullName LIKE '% [%' , substring(t.FullName, 1, LOCATE(' [', t.FullName)-1), t.FullName), t.author), t.EsaStatus), 
		concat_ws(' ', a.LastName, a.FirstName), dateWithPrecision(d.DeterminedDate, d.DeterminedDatePrecision), d.Remarks) SEPARATOR ' | ') as previousIdentifications
	into out_previous_identifications
	from determination d
	join taxon t on d.TaxonID=t.TaxonID
	left join agent a on d.DeterminerID=a.AgentID
	where d.CollectionObjectID=in_collection_object_id and (d.IsCurrent=false or d.IsCurrent is null) and (d.FeatureOrBasis!='Type status' or d.FeatureOrBasis is null)
	group by d.CollectionObjectID;
RETURN out_previous_identifications;
END$$

DELIMITER ;
```

### identification_string()

```sql
-- identification_string
DROP function IF EXISTS `identification_string`;

DELIMITER $$
USE `melisr`$$
CREATE FUNCTION `identification_string`(in_scientific_name varchar(128), in_identified_by varchar(128), in_date_identified varchar(16), in_identification_remarks text) RETURNS text CHARSET utf8
BEGIN
	DECLARE out_identification_string TEXT;
    SET out_identification_string = in_scientific_name;
    IF in_identified_by IS NOT NULL AND in_identified_by!='' THEN
		SET out_identification_string = CONCAT(out_identification_string, ', ', in_identified_by);
        IF in_date_identified IS NOT NULL AND in_date_identified!='' THEN
			SET out_identification_string = CONCAT(out_identification_string, ', ', in_date_identified);
		END IF;
	ELSE
        IF in_date_identified IS NOT NULL AND in_date_identified!='' THEN
			SET out_identification_string = CONCAT(out_identification_string, ', ', in_date_identified);
		END IF;
    END IF;
    IF in_identification_remarks IS NOT NULL AND in_identification_remarks!='' THEN
		SET out_identification_string = CONCAT(out_identification_string, ', ', in_identification_remarks);
    END IF;
    
RETURN out_identification_string;
END$$

DELIMITER ;
```

### identified_by_id()

```sql
-- identified_by_id
DROP function IF EXISTS `identified_by_id`;

DELIMITER $$
USE `melisr`$$
CREATE FUNCTION `identified_by_id`(in_determination_id int) RETURNS varchar(256) CHARSET utf8
BEGIN
	DECLARE out_identified_by_id varchar(256);
    SELECT GROUP_CONCAT(DISTINCT COALESCE(av1.Name, av2.Name) ORDER BY gp.OrderNumber SEPARATOR ' | ')
    INTO out_identified_by_id
	FROM determination d
	JOIN agent a ON d.DeterminerID=a.AgentID
	LEFT JOIN groupperson gp ON a.AgentID=gp.GroupID
	LEFT JOIN agent m ON gp.MemberID=m.AgentID
	LEFT JOIN agentvariant av1 ON COALESCE(m.AgentID, a.AgentID)=av1.AgentID AND av1.VarType=11
	LEFT JOIN agentvariant av2 ON COALESCE(m.AgentID, a.AgentID)=av2.AgentID AND av2.VarType=9
	WHERE d.DeterminationID=in_determination_id AND (av1.AgentVariantID IS NOT NULL OR av2.AgentID IS NOT NULL)
	GROUP BY d.DeterminationID;
RETURN out_identified_by_id;
END$$

DELIMITER ;
```

## Denormalise trees

### Taxon tree

In order for the publication of the Darwin Core Archive to complete in a 
reasonable amont of time, we need to cache a denormalised version of the Taxon 
tree. This table stores all taxonomic ranks in a single record, so we can just 
join it to the Taxon table and do not have to do a lot of recurrent querying.

We also add some other classification related terms, `taxonRank` and 
`higherTaxonomy` (I called it `higherTaxonomy` because I got my Darwin Core 
terms wrong and have not changed it to `higherClassification` yet, as I am not 
sure that I am not using this table for anything else).

While you could just update the records that have changed since the last update, 
I choose to replace all records every time – even though this takes almost three 
hours – as I am not sure every change in the Taxon tree will lead to a change of 
the `TimestampModified` in the Taxon table. It is not terrible if a Darwin Core 
Archive is published before the auxilliary higher taxonomy table has been 
updated, as the essential information is in the Taxon table and the higher 
classification can be picked up in the next publication. We publish every week.

**Table create statement**
```sql
CREATE TABLE `aux_highertaxonomy_test` (
  `TaxonID` int(10) unsigned NOT NULL DEFAULT '0',
  `taxonRank` varchar(16) DEFAULT NULL,
  `kingdom` varchar(64) DEFAULT NULL,
  `phylum` varchar(64) DEFAULT NULL,
  `class` varchar(64) DEFAULT NULL,
  `order` varchar(64) DEFAULT NULL,
  `family` varchar(64) DEFAULT NULL,
  `genus` varchar(64) DEFAULT NULL,
  `specificEpithet` varchar(128) DEFAULT NULL,
  `infraspecificEpithet` varchar(128) DEFAULT NULL,
  `higherTaxonomy` text,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`TaxonID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

**Procedure to update the higher taxonomy table**
```sql
DROP PROCEDURE IF EXISTS `reindex_higher_taxonymy`;

DELIMITER $$

CREATE PROCEDURE `reindex_higher_taxonymy` ()
taxa: BEGIN
    
    DECLARE var_taxon_id INTEGER(11);
    DECLARE var_node_number INT;
    DECLARE var_taxon_rank VARCHAR(16);

    DECLARE var_finished INT DEFAULT 0;
    DECLARE taxon_cursor CURSOR FOR 
        SELECT t.TaxonID, t.NodeNumber, td.Name
        FROM taxon t
        JOIN taxontreedefitem td ON t.TaxonTreeDefItemID=td.TaxonTreeDefItemID
        JOIN determination d ON t.TaxonID=d.TaxonID
        WHERE d.CollectionMemberID=4
        GROUP BY t.TaxonID;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_finished = 1;

    TRUNCATE aux_highertaxonomy_test;

    OPEN taxon_cursor;
    taxon_loop: LOOP
        FETCH taxon_cursor 
        INTO var_taxon_id, var_node_number, var_taxon_rank;

        CALL replace_higher_taxonomy_record(var_taxon_id, var_node_number, var_taxon_rank);

        IF var_finished = 1 THEN
            LEAVE taxon_loop;
        END IF;
    END LOOP taxon_loop;
    CLOSE taxon_cursor;
```

**Procedure to replace a higher taxonomy record**
```sql
DROP procedure IF EXISTS `replace_higher_taxonomy_record`;

DELIMITER $$
USE `melisr`$$
CREATE PROCEDURE `replace_higher_taxonomy_record`(in_taxon_id INTEGER(11), in_node_number INT, in_taxon_rank VARCHAR(16))
BEGIN
    DECLARE var_kingdom VARCHAR(64);
    DECLARE var_phylum VARCHAR(64);
    DECLARE var_class VARCHAR(64);
    DECLARE var_order VARCHAR(64);
    DECLARE var_family VARCHAR(64);
    DECLARE var_genus VARCHAR(64);
    DECLARE var_specific_epithet VARCHAR(64);
    DECLARE var_infraspecific_epithet VARCHAR(64);
    DECLARE var_higher_taxonomy TEXT;

    DECLARE var_taxonomy_rank VARCHAR(16);
    DECLARE var_taxonomy_name VARCHAR(128);
    DECLARE var_taxonomy_full_name VARCHAR(128);

    DECLARE var_finished INT DEFAULT 0;
    DECLARE higher_taxonomy_cursor CURSOR FOR
        SELECT td.Name as var_rank, t.name as var_name, if(t.FullName LIKE '% [%' , substring(t.FullName, 1, LOCATE(' [', t.FullName)-1), t.FullName)
        FROM taxon t
        JOIN taxontreedefitem td ON t.TaxonTreeDefItemID=td.TaxonTreeDefItemID
        WHERE NodeNumber<=in_node_number AND HighestChildNodeNumber>=in_node_number 
            AND NodeNumber>1 AND t.Name NOT LIKE '%indet.'
        ORDER BY td.RankID;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_finished = 1;

    OPEN higher_taxonomy_cursor;
    higher_taxonomy_loop: LOOP
        FETCH higher_taxonomy_cursor
        INTO var_taxonomy_rank, var_taxonomy_name, var_taxonomy_full_name;

        IF var_taxonomy_rank != in_taxon_rank THEN
            IF var_higher_taxonomy IS NULL THEN
                SET var_higher_taxonomy = var_taxonomy_full_name;
            ELSE
                SET var_higher_taxonomy = CONCAT_WS(' | ', var_higher_taxonomy, var_taxonomy_full_name);
            END IF;
        END IF;

        CASE var_taxonomy_rank
            WHEN 'kingdom' THEN 
				SET var_kingdom = var_taxonomy_name;
            WHEN 'division' THEN 
				SET var_phylum = var_taxonomy_name; 
            WHEN 'class' THEN 
				SET var_class = var_taxonomy_name;
            WHEN 'order' THEN 
				SET var_order = var_taxonomy_name;
            WHEN 'family' THEN 
				SET var_family = var_taxonomy_name;
            WHEN 'genus' THEN SET var_genus = var_taxonomy_name;
            WHEN 'species' THEN 
				SET var_specific_epithet = var_taxonomy_name;
            WHEN 'subspecies' THEN 
				SET var_infraspecific_epithet = var_taxonomy_name;
            WHEN 'variety' THEN 
				SET var_infraspecific_epithet = var_taxonomy_name;
            WHEN 'subvariety' THEN 
				SET var_infraspecific_epithet = var_taxonomy_name;
            WHEN 'forma' THEN 
				SET var_infraspecific_epithet = var_taxonomy_name;
            WHEN 'subforma' THEN 
				SET var_infraspecific_epithet = var_taxonomy_name;
            ELSE 
				BEGIN END;
        END CASE;

        IF var_finished = 1 THEN
            LEAVE higher_taxonomy_loop;
        END IF;
    END LOOP higher_taxonomy_loop;
    
    IF in_taxon_rank='division' THEN 
		SET in_taxon_rank='phylum'; 
	END IF;

    REPLACE INTO aux_highertaxonomy_test (TaxonID, taxonRank,
        kingdom, phylum, `class`, `order`, family, genus, specificEpithet, infraspecificEpithet,
        higherTaxonomy, modified)
    VALUES (in_taxon_id, in_taxon_rank, 
        var_kingdom, var_phylum, var_class, var_order, var_family, var_genus,
        var_specific_epithet, var_infraspecific_epithet, var_higher_taxonomy, now());
    CLOSE higher_taxonomy_cursor;
END$$

DELIMITER ;
```
### Geography tree

The Geography tree also needs to be flattened. I have added `countryCode` to 
this table as well, so it does not need to be stored in a custom field in the 
Geography table.

We use the [TDWG World Geographical Scheme for Recording Plant Distributions (WGSRPD)](https://www.tdwg.org/standards/wgsrpd/) 
in our Geography tree and, while we are moving away from that, the WGSRPD Level 
1 regions play an important role in how we store specimens and are printed on 
our labels, so we cannot change them in our Geography tree. Therefore, I have 
created a function that maps the WGSRPD Level 1 regions (which we just call 
'Continents' in our database) to continents and store the latter in the 
auxilliary table.

A full re-index of this table takes well under a minute.

**Table create statement**
```sql
CREATE TABLE `aux_highergeography_test` (
  `GeographyID` int(11) NOT NULL,
  `GeographyRank` varchar(16) DEFAULT NULL,
  `Continent` varchar(64) DEFAULT NULL,
  `Country` varchar(64) DEFAULT NULL,
  `State` varchar(64) DEFAULT NULL,
  `County` varchar(64) DEFAULT NULL,
  `higherGeography` text,
  `countryCode` varchar(4) DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  UNIQUE KEY `GeographyIDUNIQ` (`GeographyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

**Procedure to update higher geography table**
```sql
DROP PROCEDURE IF EXISTS `reindex_higher_geography`;

DELIMITER $$

CREATE PROCEDURE `reindex_higher_geography` ()
BEGIN
    
    DECLARE var_geography_id INTEGER(11);
    DECLARE var_node_number INT;
    DECLARE var_geography_rank VARCHAR(16);

    DECLARE var_finished INT DEFAULT 0;
    DECLARE geography_cursor CURSOR FOR 
        SELECT g.GeographyID, g.NodeNumber, gd.Name
        FROM geography g
        JOIN geographytreedefitem gd ON g.GeographyTreeDefItemID=gd.GeographyTreeDefItemID
        JOIN locality l ON g.GeographyID=l.GeographyID
        JOIN collectingevent ce ON l.LocalityID=ce.CollectingEventID
        JOIN collectionobject co ON ce.CollectingEventID=co.CollectingEventID
        WHERE co.CollectionID=4
        GROUP BY g.GeographyID;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_finished = 1;

    TRUNCATE aux_highergeography_test;

    OPEN geography_cursor;
    geography_loop: LOOP
        FETCH geography_cursor 
        INTO var_geography_id, var_node_number, var_geography_rank;

        CALL replace_higher_geography_record(var_geography_id, var_node_number, var_geography_rank);

        IF var_finished = 1 THEN
            LEAVE geography_loop;
        END IF;
    END LOOP geography_loop;
    CLOSE geography_cursor;
END $$

DELIMITER ;
```

**Procedure to replace a higher geography record**
```sql
DROP procedure IF EXISTS `replace_higher_geography_record`;

DELIMITER $$
USE `melisr`$$
CREATE PROCEDURE `replace_higher_geography_record`(in_geography_id INTEGER(11), in_node_number INT, in_geography_rank VARCHAR(16))
BEGIN
    DECLARE var_continent VARCHAR(64);
    DECLARE var_country VARCHAR(64);
    DECLARE var_state VARCHAR(64);
    DECLARE var_county VARCHAR(64);
    DECLARE var_higher_geography TEXT;

    DECLARE var_geography_rank VARCHAR(16);
    DECLARE var_geography_name VARCHAR(128);
    DECLARE var_geography_full_name VARCHAR(128);
    DECLARE var_geography_code VARCHAR(16);
    DECLARE var_country_code VARCHAR(4);

    DECLARE var_finished INT DEFAULT 0;
    DECLARE higher_geography_cursor CURSOR FOR
        SELECT gd.Name as var_rank, g.name as var_name, g.GeographyCode AS var_code
        FROM geography g
        JOIN geographytreedefitem gd ON g.GeographyTreeDefItemID=gd.GeographyTreeDefItemID
        WHERE g.NodeNumber<=in_node_number AND g.HighestChildNodeNumber>=in_node_number 
            AND g.NodeNumber>1 AND g.GeographyTreeDefID=1
        ORDER BY gd.RankID;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_finished = 1;

    OPEN higher_geography_cursor;
    higher_geography_loop: LOOP
        FETCH higher_geography_cursor
        INTO var_geography_rank, var_geography_name, var_geography_code;
        
        IF var_geography_rank = 'Continent' THEN
			SET var_geography_name = map_continent(var_geography_name);
        END IF;

        IF var_geography_rank != in_geography_rank THEN
            IF var_higher_geography IS NULL THEN
                SET var_higher_geography = var_geography_name;
            ELSE
                SET var_higher_geography = CONCAT_WS(' | ', var_higher_geography, var_geography_name);
            END IF;
        END IF;

        CASE var_geography_rank
            WHEN 'continent' THEN 
				SET var_continent = var_geography_name;
            WHEN 'country' THEN 
				SET var_country = var_geography_name; 
                SET var_country_code=var_geography_code;
            WHEN 'state' THEN 
				SET var_state = var_geography_name;
            WHEN 'county' THEN 
				SET var_county = var_geography_name;
            ELSE BEGIN END;
        END CASE;

        IF var_finished = 1 THEN
            LEAVE higher_geography_loop;
        END IF;
    END LOOP higher_geography_loop;

    REPLACE INTO aux_highergeography_test (GeographyID, geographyRank,
        continent, country, `state`, county, higherGeography, countryCode, modified)
    VALUES (in_geography_id, in_geography_rank, 
        var_continent, var_country, var_state, var_county, var_higher_geography, var_country_code, now());
    CLOSE higher_geography_cursor;
END$$

DELIMITER ;
```

**map_continent() function**
```sql
DROP function IF EXISTS `map_continent`;

DELIMITER $$
CREATE FUNCTION `map_continent`(in_continent varchar(64)) RETURNS varchar(32) CHARSET utf8
BEGIN
	DECLARE out_continent VARCHAR(32);
    SET out_continent = CASE in_continent
      WHEN '1. Europe' THEN 'Europe'
      WHEN '2. Africa' THEN 'Africa'
      WHEN '3. Asia-Temperate' THEN 'Asia'
      WHEN '4. Asia-Tropical' THEN 'Asia'
      WHEN '5. Australasia' THEN 'Oceania'
      WHEN '6. Pacific' THEN 'Oceania'
      WHEN '7. Northern America' THEN 'North America'
	  WHEN '8. Southern America' THEN 'South America'
      WHEN '9. Antarctica' THEN 'Antarctica' 
      ELSE NULL
	END;
RETURN out_continent;
END$$

DELIMITER ;
```